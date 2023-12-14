import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { iAuthData } from '../../Models/auth/i-auth-data';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent {

  constructor(private authSvc: AuthService) { }

  user!: iAuthData

  ngOnInit() {
    this.authSvc.user$.subscribe(res => {
      if (res) this.user = res
    })
  }

}
