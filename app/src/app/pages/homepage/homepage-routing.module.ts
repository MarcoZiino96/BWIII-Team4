import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { DetailComponent } from './detail/detail.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'detail/:id', component: DetailComponent},
  { path: 'result/:categoria', component: ResultComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
