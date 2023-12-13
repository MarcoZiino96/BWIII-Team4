import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIricetteService } from '../../../services/apiricette.service';
import { iRicetta } from '../../../Models/iricetta';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {

  ricetta!:iRicetta

  constructor(
    private route:ActivatedRoute,
    private apiSvc:APIricetteService
  ){}


  ngOnInit(){

    this.route.params.subscribe((params:any) =>{
      this.apiSvc.getById(params.id).subscribe(( res=>{
        this.ricetta = res;

      }))
   })
  }
}
