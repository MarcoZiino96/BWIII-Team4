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
      this.ricetteArr = data.slice(0, 30);


      })

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
      case 'Primo':
        return '../../../assets/img/primo.png';
      default:
        return 'https://picsum.photos/200/300?random=1';
    }
  }

}
