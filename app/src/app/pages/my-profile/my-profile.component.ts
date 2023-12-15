import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { iAuthData } from '../../Models/auth/i-auth-data';
import { APIricetteService } from '../../services/apiricette.service';
import { iRicetta } from '../../Models/iricetta';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent {

  constructor(private authSvc: AuthService, private apiSvc: APIricetteService) { }

  user!: iAuthData
  userArrRecipe:iRicetta[] = [];

  ngOnInit() {
    this.authSvc.user$.subscribe(res => {
      if (res) this.user = res
      this.apiSvc.getAllByUserId(this.user.user.id).subscribe(r => {
        this.userArrRecipe = r
      })
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

  delete(id:number){
    this.apiSvc.delete(id)?.subscribe(res => {
      const index:number = this.userArrRecipe.findIndex(r => {
        r.id === id
      })
      this.userArrRecipe.splice(index, 1)
      this.dNone = ''
      this.fadeOut = ''
      this.fadeIn = ''
    })
  }




}
