import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';
import { AppModule } from '../../app.module';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzAutocompleteComponent, NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { LeftBarComponent } from './left-bar/left-bar.component';


@NgModule({
  declarations: [
    MyProfileComponent,
    LeftBarComponent
  ],
  imports: [
    CommonModule,
    MyProfileRoutingModule
  ],
  exports: [
    LeftBarComponent
  ]
})
export class MyProfileModule { }
