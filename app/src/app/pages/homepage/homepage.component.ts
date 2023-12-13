import { Component, numberAttribute } from '@angular/core';
import { APIricetteService } from '../../services/apiricette.service';
import { iRicetta } from '../../Models/iricetta';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  constructor(private apiSvc: APIricetteService) { }

  ricetteArr: iRicetta[] = [];
  ricetteArrPrimo: iRicetta[] = [];
  ricetteArrContorno: iRicetta[] = [];
  ricetteArrDessert: iRicetta[] = [];
  ricetteArrBevande: iRicetta[] = [];


  ngOnInit() {

    this.apiSvc.getAll().subscribe(data => {
      this.ricetteArr = data;
    });
    this.apiSvc.getByCat('Primo')?.subscribe(data1=>{
      this.ricetteArrPrimo = data1;
      console.log(this.ricetteArrPrimo);
    });
    this.apiSvc.getByCat('Contorno')?.subscribe(data2=>{
      this.ricetteArrContorno = data2;
    });
    this.apiSvc.getByCat('Dessert')?.subscribe(data3=>{
      this.ricetteArrDessert = data3;
    });
    this.apiSvc.getByCat('Bevande')?.subscribe(data4=>{
      this.ricetteArrBevande = data4;
    });

  }


  getImgByCategories(categoria:string):string {
    return this.apiSvc.getImgByCategories(categoria)
  }


}
