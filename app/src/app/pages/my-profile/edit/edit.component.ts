import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { iAuthData } from '../../../Models/auth/i-auth-data';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  constructor(private authSvc: AuthService) { }

  user!: iAuthData

  ngOnInit() {
    this.authSvc.user$.subscribe(res => {
      if (res) this.user = res
    })
  }


}
