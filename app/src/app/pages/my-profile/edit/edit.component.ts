import { APIricetteService } from './../../../services/apiricette.service';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { iAuthData } from '../../../Models/auth/i-auth-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  constructor(private authSvc: AuthService, private route: ActivatedRoute, private apiSvc: APIricetteService) { }

  id!: number
  mode!: string
  user!: iAuthData

  ngOnInit() {
    this.authSvc.user$.subscribe(res => {
      if (res) this.user = res
      this.route.params.subscribe((params: any) => {
        if (params.id) {
          const id = Number(params.id)
          this.apiSvc.getById(id).subscribe(res => {
            if (res.userId === this.user.user.id) {
              this.mode = 'edit'
            } else {
              this.mode = 'create'
            }
          })
        }
      })
    })



  }


}
