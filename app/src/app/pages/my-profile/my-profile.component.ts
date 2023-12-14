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

  fadeIn: string = ''
  dNone: string = 'd-none'
  fadeOut: string = ''

  createFormFadeIn: string = ''
  createFormDNone: string = 'd-none'
  createFormFadeOut: string = ''

  profileFadeIn: string = ''
  profileDNone: string = ''
  profileFadeOut: string = ''


  listToggle() {
    if (this.dNone) {
      this.dNone = ''
      this.fadeIn = 'fade-in-animation'
      setTimeout(
        () => this.fadeIn = '', 400
      )
    } else if (!this.dNone) {
      this.fadeOut = 'fade-out-animation'
      setTimeout(
        () => {
          this.dNone = 'd-none'
          this.fadeOut = ''
        }, 400
      )

    }
  }

  switchToCreateForm() {
    if (this.createFormDNone) {
      this.profileFadeOut = 'fade-out-animation'
      setTimeout(
        () => {
          this.createFormDNone = ''
          this.createFormFadeIn = 'fade-in-animation'
          this.createFormFadeIn = ''
          this.profileFadeOut = ''
          this.profileDNone = 'd-none'
        }, 400
      )
    }
  }


}
