import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSplideModule } from 'ngx-splide';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';


@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    NgxSplideModule
  ]
})
export class HomepageModule { }
