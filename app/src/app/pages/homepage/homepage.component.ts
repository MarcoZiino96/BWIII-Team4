import { Component } from '@angular/core';
import { APIricetteService } from '../../services/apiricette.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  constructor(private apiScv: APIricetteService) { }

  ngOnInit() {
    this.apiScv.getAll().subscribe
  }

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

  onSplideInit(splide:Event)
  {
  console.log(splide);
  }


}
