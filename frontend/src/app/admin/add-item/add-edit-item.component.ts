import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category-service';
import { ItemsService } from '../../services/items.service';
import { Item } from '../../models/Item';
import { firstValueFrom, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      description: ['', Validators.required],
      thumbnail: ['', Validators.required],
      categories: [[], Validators.required],
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

  save() {
    if (this.form.invalid) {
      return alert('Form invalid!');
    }

    if (this.itemId) {
      return firstValueFrom(this._itemsService.update(this.form.getRawValue()));
    }

    return firstValueFrom(this._itemsService.add(this.form.getRawValue()));
  }

  isSelected(category: string) {
    return (this.form.get('categories')?.value as string[]).includes(category);
  }

  private patchForm(item: Item) {
    this.form.patchValue(item);
  }
}
