import { Component, numberAttribute } from '@angular/core';
import { APIricetteService } from '../../services/apiricette.service';
import { iRicetta } from '../../Models/iricetta';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  constructor(private apiScv: APIricetteService) { }

  ricetteArr: iRicetta[] = [];
  ricetteArrPrimo: iRicetta[] = [];
  ricetteArrContorno: iRicetta[] = [];
  ricetteArrDessert: iRicetta[] = [];
  ricetteArrBevande: iRicetta[] = [];


  ngOnInit() {

    this.apiScv.getAll().subscribe(data => {
      this.ricetteArr = data;
    });
    this.apiScv.getByCat('Primo')?.subscribe(data1=>{
      this.ricetteArrPrimo = data1;
      console.log(this.ricetteArrPrimo);
    });
    this.apiScv.getByCat('Contorno')?.subscribe(data2=>{
      this.ricetteArrContorno = data2;
    });
    this.apiScv.getByCat('Dessert')?.subscribe(data3=>{
      this.ricetteArrDessert = data3;
    });
    this.apiScv.getByCat('Bevande')?.subscribe(data4=>{
      this.ricetteArrBevande = data4;
    });

  }









  getImgByCategories(categoria: string): string {
    switch (categoria) {
      case 'Antipasto':
        return '../../../assets/img/antipasto.png';
      case 'Pollame':
        return '../../../assets/img/pollame.png';
      case 'Pesce':
        return '../../../assets/img/pesce.png';
      case 'Carne':
        return '../../../assets/img/carne.png';
      case 'Bevande':
        return '../../../assets/img/bevande.png';
      case 'Salsa':
        return '../../../assets/img/salse.png';
      case 'Contorno':
        return '../../../assets/img/contorno.png';
      case 'Dessert':
        return '../../../assets/img/dessert.png';
        case 'Primo':
        return '../../../assets/img/primo.png';
      default:
        return 'https://picsum.photos/200/300?random=1';
    }
  }


}
