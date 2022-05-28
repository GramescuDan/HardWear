import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { AddEditItemComponent } from './add-item/add-edit-item.component';
import { ItemsComponent } from './items/items.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";


@NgModule({
  declarations: [
    AddEditItemComponent,
    ItemsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'items',
        component: ItemsComponent,
      },
      {
        path: 'items/add',
        component: AddEditItemComponent
      },
      {
        path: 'items/edit/:itemId',
        component: AddEditItemComponent
      },
      {
        path: '**',
        redirectTo: 'items'
      }
    ]),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule
  ],
  exports: [RouterModule]
})
export class AdminModule {
}
