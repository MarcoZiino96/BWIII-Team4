import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';
import { RecipeFormComponent } from '../../../components/recipe-form/recipe-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { MyProfileModule } from '../my-profile.module';


@NgModule({
  declarations: [
    EditComponent,
    RecipeFormComponent
  ],
  imports: [
    CommonModule,
    EditRoutingModule,
    ReactiveFormsModule,
    NzAutocompleteModule,
    NzSelectModule,
    FormsModule,
    MyProfileModule
  ]
})
export class EditModule { }
