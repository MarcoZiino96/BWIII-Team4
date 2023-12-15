import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.scss'
})
export class LeftBarComponent {

  constructor( private authSvc:AuthService){}

  logOut(){

    this.authSvc.logOut();
  }
}
