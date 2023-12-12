import { Component } from '@angular/core';
import { APIricetteService } from '../../services/apiricette.service';
import { iRicetta } from '../../Models/iricetta';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  constructor(private apiScv: APIricetteService) { }

  ricetteArr:iRicetta[] = [];


  // ngOnInit() {
  //   this.apiScv.getAll().subscribe(data=> {
  //     this.ricetteArr.push(data);
  //   }
  //   )
  // }

  getImgByCategories(categoria: string): string {
    switch (categoria.toLowerCase()) {
      case 'Antipasto ':
        return 'gold';
      case 'Pollame':
        return '';
      case 'Pesce':
        return '';
      case 'Carne':
        return '';
      case 'Bevande':
        return '';
      case 'Dessert':
        return '';
      default:
        return '';
    }
  }


}
