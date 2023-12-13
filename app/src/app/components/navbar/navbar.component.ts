import { Component } from '@angular/core';
import { APIricetteService } from '../../services/apiricette.service';

@Component({
  selector: '.app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  open:boolean = false;

  constructor(private apiSvc:APIricetteService){}

}
