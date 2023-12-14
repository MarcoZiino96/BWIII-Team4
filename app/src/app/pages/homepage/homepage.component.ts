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
      this.ricetteArr = data.slice(0, 100);
      this.filterRicetteByCategory('Primo');
      this.filterRicetteByCategory('Contorno');
      this.filterRicetteByCategory('Dessert');
      this.filterRicetteByCategory('Bevande');
    });
  }

  filterRicetteByCategory(categoria: string): void {
    const filteredRicette = this.ricetteArr.filter(r => r.categoria === categoria);

    switch (categoria) {
      case 'Primo':
        this.ricetteArrPrimo = filteredRicette;
        break;
      case 'Contorno':
        this.ricetteArrContorno = filteredRicette;
        break;
      case 'Dessert':
        this.ricetteArrDessert = filteredRicette;
        break;
      case 'Bevande':
        this.ricetteArrBevande = filteredRicette;
        break;
      default:
        break;
    }
  }


  getImgByCategories(categoria:string):string {
    return this.apiSvc.getImgByCategories(categoria)
  }


}
