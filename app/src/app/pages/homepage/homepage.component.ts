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
  categorie:string[] = [];




  ngOnInit() {
    this.apiSvc.getAll().subscribe(data => {
      this.ricetteArr = data.slice(100, 250);
      this.filterRicetteByCategory('Primo');
      this.filterRicetteByCategory('Contorno');
      this.filterRicetteByCategory('Dessert');
      this.filterRicetteByCategory('Bevande');
    });
    this.apiSvc.getAllCat().subscribe(res => {
      this.categorie = res})
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
