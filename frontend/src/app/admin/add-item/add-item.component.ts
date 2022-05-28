import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoryService } from "../../services/category-service";
import { ItemsService } from "../../services/items.service";
import { Item } from "../../models/Item";
import { firstValueFrom } from "rxjs";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  readonly form: FormGroup;

  constructor(formBuilder: FormBuilder, readonly categoriesService: CategoryService, private readonly _itemsService: ItemsService) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      description: ['', Validators.required],
      thumbnail: ['', Validators.required],
      categories: [[], Validators.required]
    });
  }

  ngOnInit(): void {
  }

  addCategory(category: string) {
    console.log(category)
    const existing = (this.form.get('categories')?.value as string[]);
    if (existing.includes(category)) {
      this.form.get('categories')?.patchValue(existing.filter(c => c !== category))
    }
    this.form.get('categories')?.patchValue([...existing, category])
  }

  save() {
    if (this.form.invalid) {
      return alert('Form invalid!')
    }

    return firstValueFrom(this._itemsService.add(this.form.getRawValue() as Item));
  }

  isSelected(category: string) {
    return (this.form.get('categories')?.value as string[]).includes(category);
  }
}
