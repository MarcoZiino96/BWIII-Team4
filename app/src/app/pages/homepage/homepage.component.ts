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
  // perPage: number = 0;


  ngOnInit() {
    this.apiScv.getAll().subscribe(data=> {
      this.ricetteArr = data.slice (5, 35)
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


// setPerPage() {
//     if (window.innerWidth < 450) {
//       this.perPage = 1;
//     } else if (window.innerWidth < 690) {
//         this.perPage = 2;
//     } else if (window.innerWidth < 1024) {
//         this.perPage = 3;
//     } else if (window.innerWidth < 1360) {
//         this.perPage = 4;
//     } else if (window.innerWidth < 1620) {
//         this.perPage = 5;
//     } else {
//         this.perPage = 6;
//     }

// }

// getCategory(){
//   this.apiScv.getAllCat().subscribe(cat => {}

// }

}
