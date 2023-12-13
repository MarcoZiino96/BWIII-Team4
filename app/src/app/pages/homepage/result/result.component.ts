import { Component } from '@angular/core';
import { iRicetta } from '../../../Models/iricetta';
import { ActivatedRoute } from '@angular/router';
import { APIricetteService } from '../../../services/apiricette.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {

  ricette:iRicetta[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiSvc: APIricetteService
  ) { }


  ngOnInit() {

    this.route.params.subscribe((params: any) => {
      this.apiSvc.getById(params.id).subscribe((res => {
        // this.ricette = res;

        console.log(res);


      }))
    })
  }

  getImgByCategories(categoria:string){
    return this.apiSvc.getImgByCategories(categoria)
  }
}
