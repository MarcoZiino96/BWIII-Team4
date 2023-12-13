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

  ricetteArr:iRicetta[] = [];


  ngOnInit() {
    this.apiScv.getAll().subscribe(data=> {
      this.ricetteArr = data.slice (0, 30)
    }
    )
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
      case 'Dessert':
        return '../../../assets/img/copertine.png';
      default:
        return '../../../assets/img/copertine.png';
    }
  }

getCategory(){
  this.apiScv.getAllCat().subscribe(cat => {
    console.log(cat);

  })

}

}
