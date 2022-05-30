import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category-service';
import { ItemsService } from '../../services/items.service';
import { Item } from '../../models/Item';
import { firstValueFrom, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FileInput } from 'ngx-material-file-input';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.css'],
})
export class AddEditItemComponent implements OnInit {
  readonly form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    readonly categoriesService: CategoryService,
    private readonly _itemsService: ItemsService,
    private readonly _router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      description: ['', Validators.required],
      thumbnail: ['', Validators.required],
      categories: [[], Validators.required],
      currentFile: [null, Validators.required],
    });
  }

  get itemId() {
    return this.activatedRoute.snapshot.paramMap.get('itemId');
  }

  async ngOnInit() {
    const itemId = this.itemId;
    const item = this._itemsService
      .get()
      .pipe(map(items => items.find(i => i.id === Number(itemId))));
    if (item) {
      this.patchForm((await firstValueFrom(item)) ?? ({} as Item));
    }
  }

  addCategory(category: string) {
    const existing = this.form.get('categories')?.value as string[];
    if (existing.includes(category)) {
      this.form.get('categories')?.patchValue(existing.filter(c => c !== category));
    }
    this.form.get('categories')?.patchValue([...existing, category]);
  }

  async save() {
    if (this.form.invalid) {
      return alert('Form invalid!');
    }

    if (this.itemId) {
      await firstValueFrom(this._itemsService.update(this.form.getRawValue()));
      return this._router.navigate(['/admin/items']);
    }

    const fileInput = this.form.get('currentFile')?.value as FileInput;
    const file = fileInput.files[0];
    console.log(this.form.getRawValue(), file as Blob);
    await this._itemsService.add(this.form.getRawValue(), file as Blob);
    return this._router.navigate(['/admin/items']);
  }

  isSelected(category: string) {
    return (this.form.get('categories')?.value as string[]).includes(category);
  }

  private patchForm(item: Item) {
    this.form.patchValue(item);
  }
}
