import { Component, ViewChild } from '@angular/core';
import { iRicetta } from '../../Models/iricetta';
import { FormBuilder, FormControl } from '@angular/forms';
import { APIricetteService } from '../../services/apiricette.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: '.app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  inputValue?: string;
  options: string[] = []
  res!: iRicetta[]
  lang!: string

  constructor(
    private fb: FormBuilder,
    private apiSvc: APIricetteService,
    private router: Router,
    private authSvc:AuthService) { }

  input: FormControl = this.fb.control(null)
  isLoggedIn$!:boolean



  onInput(event: Event): void {
    if (this.input.value) {
      if (this.input.value.length >= 3) {
        const api = this.apiSvc.searchByName(this.input.value, 6).subscribe(res => {
          if (res.length !== 0) {
            this.res = res
            this.options = res.map(el => el.nome)
          } else {
            this.options = [`${this.input.value}... (nessun risultato)`]
          }
        })
      } else {
        this.options = []
      }
    }
  }

  @ViewChild('auto') element!: any

  actOnceWhenItemSelected: boolean = false

  open: boolean = false
  aperto: boolean = false


  ngDoCheck() {
    if (this.element) {
      if (this.element.activeItem?.selected) this.act(this.element.activeItem.nzValue)
      if (!this.element.activeItem || !this.element.activeItem?.selected) this.actOnceWhenItemSelected = false
    }
  }

  act(match: string) {
    if (!this.actOnceWhenItemSelected)
      if (this.res) {
        const selectedRes: iRicetta | undefined = this.res.find(r => r.nome === match)
        if (selectedRes) {
          this.input = this.fb.control(null)
          this.router.navigate([`/detail/${selectedRes.id}`])
        }
        this.actOnceWhenItemSelected = true
      }
  }

  categorie:string[] = [];

  ngOnInit(){
    this.apiSvc.getAllCat().subscribe(res => {
      this.categorie = res
    })
    this.authSvc.isLoggedIn$.subscribe(res => this.isLoggedIn$ = res)
  }




}
