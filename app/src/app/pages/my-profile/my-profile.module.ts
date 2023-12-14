import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';
import { AppModule } from '../../app.module';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form.component';


@NgModule({
  declarations: [
    MyProfileComponent,
    RecipeFormComponent
  ],
  imports: [
    CommonModule,
    MyProfileRoutingModule
  ]
})
export class MyProfileModule { }
