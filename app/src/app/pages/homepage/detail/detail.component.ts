import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIricetteService } from '../../../services/apiricette.service';
import { iRicetta } from '../../../Models/iricetta';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {

  ricetta!: iRicetta

  constructor(
    private route: ActivatedRoute,
    private apiSvc: APIricetteService
  ) { }


  ngOnInit() {

    this.route.params.subscribe((params: any) => {
      this.apiSvc.getById(params.id).subscribe((res => {
        this.ricetta = res;

        console.log(this.ricetta);


      }))
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
      case 'Dessert':
        return '../../../assets/img/dessert.png';
        case 'Primo':
        return '../../../assets/img/primo.png';
      default:
        return 'https://picsum.photos/200/300?random=1';
    }
  }
}
