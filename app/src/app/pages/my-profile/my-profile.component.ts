import { Component } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent {

  fadeIn: string = ''
  dNone: string = 'd-none'
  fadeOut: string = ''


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


}
