import { Component, HostListener, numberAttribute } from '@angular/core';
import { APIricetteService } from '../../services/apiricette.service';
import { iRicetta } from '../../Models/iricetta';
import { BrowserService } from '../../services/browser.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateSplideHeight();
  }

  constructor(
    private apiSvc: APIricetteService,
    private browserService: BrowserService) { }

  ricetteArr: iRicetta[] = [];
  ricetteArrPrimo: iRicetta[] = [];
  ricetteArrContorno: iRicetta[] = [];
  ricetteArrDessert: iRicetta[] = [];
  ricetteArrBevande: iRicetta[] = [];
  categorie:string[] = [];
  splideHeight:number = 350;

  private updateSplideHeight() {
    const screenWidth = this.browserService.innerWidth();

    if (screenWidth > 500) {
      this.splideHeight = 500
    }
    else {
      this.splideHeight = 350
    }
  }


  ngOnInit() {
    this.apiSvc.getAll().subscribe(data => {
      this.ricetteArr = data.slice(100, 250);
      this.filterRicetteByCategory('Primo');
      this.filterRicetteByCategory('Contorno');
      this.filterRicetteByCategory('Dessert');
      this.filterRicetteByCategory('Bevande');
    });
    this.updateSplideHeight();
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
