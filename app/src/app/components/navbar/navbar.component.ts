import { Component } from '@angular/core';
import { APIricetteService } from '../../services/apiricette.service';
import { iRicetta } from '../../Models/iricetta';

@Component({
  selector: '.app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  open:boolean = false;

  constructor(private apiSvc:APIricetteService){}

  ricetteArr:iRicetta[] = [];




  ngOnInit(){
    this.apiSvc.getAll().subscribe(data =>{
      this.ricetteArr = data
      console.log(this.ricetteArr)
    })
  }

}
