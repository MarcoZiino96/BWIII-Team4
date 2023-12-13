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




  // ngOnInit() {
  //   this.apiScv.getAll().subscribe(data => {
  //     this.ricetteArr = data.slice(0, 30);

  //     })


  //     }
  ngOnInit() {
    this.apiScv.getAll().subscribe(data => {
      this.ricetteArr = data;
    });
  }





  getImgByCategories(categoria: string): string {
    switch (categoria.toLowerCase()) {
      case 'Antipasto':
        return '../../../assets/img/copertine.png';
      case 'Pollame':
        return '../../../assets/img/copertine.png';
      case 'Pesce':
        return '../../../assets/img/copertine.png';
      case 'Carne':
        return '../../../assets/img/copertine.png';
      case 'Bevande':
        return '../../../assets/img/copertine.png';
      case 'Salsa':
        return '../../../assets/img/copertine.png';
      case 'Contorno':
        return '../../../assets/img/copertine.png';
      case 'Primo':
        return '../../../assets/img/copertine.png';
      default:
        return 'https://picsum.photos/200/300?random=1';
    }
  }
  }
