import { Component, Pipe } from '@angular/core';
import { iRicetta } from '../../../Models/iricetta';
import { ActivatedRoute } from '@angular/router';
import { APIricetteService } from '../../../services/apiricette.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {

  constructor(
    private route: ActivatedRoute,
    private apiSvc: APIricetteService
  ) { }


  ricette:iRicetta[] = [];

  getImgByCategories(categoria:string){
    return this.apiSvc.getImgByCategories(categoria)
  }


  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.apiSvc.getByCat(params.categoria)?.subscribe((res => {
        this.ricette = res;
      }))
    })
  }

}
