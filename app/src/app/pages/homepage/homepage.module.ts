import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSplideModule } from 'ngx-splide';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { DetailComponent } from './detail/detail.component';
import { ResultComponent } from './result/result.component';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    HomepageComponent,
    DetailComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    NgxSplideModule,
    PipesModule
  ]
})
export class HomepageModule { }
