import { APIricetteService } from './../../../services/apiricette.service';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { iAuthData } from '../../../Models/auth/i-auth-data';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iRicetta } from '../../../Models/iricetta';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {


  id!: number
  options!: string[]
  onceDirty: boolean = true
  currentRecipe!: iRicetta
  color: string = ''
  valid!: boolean
  errorMsg!: any
  msg!: any
  unmatch: boolean = false
  match: boolean = false
  categories: string[] = []
  user!: iAuthData
  registered: boolean = false
  newRecipeName!: string


  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private apiSvc: APIricetteService,
    private router: Router,
    private route: ActivatedRoute){}

  onInput(event: Event): void {
    if (this.ricettaForm.controls['categoria'].value) {
      if (this.onceDirty) {
        this.options.unshift(this.ricettaForm.controls['categoria'].value)
        this.onceDirty = false
      } else {
        const value: any = this.ricettaForm.controls['categoria'].value
        if (value.length > 0) {
          this.options.splice(0, 1, this.ricettaForm.controls['categoria'].value)
        } else {
          this.options.splice(0, 1)
        }
      }

    }
  }

  ricettaForm: FormGroup = this.fb.group({
    nome: this.fb.control(null, [Validators.required]),
    ingredienti: this.fb.control(null, [Validators.required, Validators.pattern(/^([a-z0-9\s]+,)*([a-z0-9\s]+){1}$/i)]),
    categoria: this.fb.control(null, [Validators.required]),
    preparazione: this.fb.control(null, [Validators.required, Validators.minLength(25)]),
    public: this.fb.control("true")
  })

  ngOnInit() {
    this.apiSvc.getAllCat().subscribe(res => this.options = res)
    this.authSvc.user$.subscribe(res => res ? this.user = res : undefined)
    this.authSvc.user$.subscribe(res => {
      if (res) this.user = res
      this.route.params.subscribe((params: any) => {
        if (params.id) {
          const id = Number(params.id)
          this.id = id
          this.apiSvc.getById(id).subscribe(res => {
            let ingList: string = ''
            if (res.userId === this.user.user.id) {
              this.apiSvc.getById(id).subscribe(r => {

                r.ingredienti.forEach((i: string, ind: number) => {
                  if (ind === 0) {
                    ingList += i
                  } else {
                    ingList += `, ${i}`
                  }
                })

                this.currentRecipe = r
                console.log(ingList)
                this.ricettaForm = this.fb.group({
                  nome: this.fb.control(r.nome, [Validators.required]),
                  ingredienti: this.fb.control(ingList, [Validators.required, Validators.pattern(/^([a-z0-9\s]+,)*([a-z0-9\s]+){1}$/i)]),
                  categoria: this.fb.control(r.categoria, [Validators.required]),
                  preparazione: this.fb.control(r.preparazione, [Validators.required, Validators.minLength(25)]),
                  public: r.public ? this.fb.control("true") : this.fb.control("false")
                })


              })
            }
          })
        }
      })
    })
  }

  ngDoCheck() {

    this.errorMsg = {
      nome: this.setInvalidMessages('nome'),
      categoria: this.setInvalidMessages('categoria'),
      ingredienti: this.setInvalidMessages('ingredienti'),
      preparazione: this.setInvalidMessages('preparazione'),
      public: this.setInvalidMessages('public')
    }



    this.msg = {
      nome: '',
      categoria: '',
      ingredienti: '',
      preparazione: '',
      public: ''
    }
  }

  newRecipe() {
    this.ricettaForm.reset()
    this.ricettaForm.controls['public'] = this.fb.control("true")
    this.registered = false
  }

  setInvalidMessages(fieldName: string): string {
    const field: AbstractControl | null = this.ricettaForm.get(fieldName)
    let errorMsg: string = ''
    if (field) {
      if (field.errors) {
        if (field.errors['required']) errorMsg = 'Campo vuoto'
      }

    }
    return errorMsg
  }

  isValid(fieldName: string) {
    return this.ricettaForm.get(fieldName)?.valid && this.ricettaForm.get(fieldName)?.dirty
  }

  isInvalid(fieldName: string) {
    return !this.ricettaForm.get(fieldName)?.valid && this.ricettaForm.get(fieldName)?.dirty
  }

  submit(): void {
    if (this.ricettaForm.valid) {

      const ing = this.ricettaForm.controls['ingredienti'].value.split(',')
        .map((i: string) => i.replace(/\s\s+/g, ' ').trim()).filter((i: string) => i)



      if (!this.id) {
        const newRecipe: Partial<iRicetta> = {
          nome: this.ricettaForm.controls['nome'].value.replace(/\s\s+/g, ' ').trim(),
          categoria: this.ricettaForm.controls['categoria'].value.replace(/\s\s+/g, ' ').trim(),
          ingrediente_1: undefined,
          persone: 0,
          note: '',
          ingredienti: ing,
          preparazione: this.ricettaForm.controls['preparazione'].value.replace(/\s\s+/g, ' ').trim(),
          immagine_primaria: '',
          visibile: '',
          public: this.ricettaForm.controls['public'].value === "true" ? true : false,
          userId: this.user?.user.id

        }
        this.apiSvc.create(newRecipe).subscribe(res => {
          if (res) {
            if (newRecipe.nome) this.newRecipeName = newRecipe.nome
            this.registered = true
          }
        })
      } else {
        const newRecipe: iRicetta = {
          nome: this.ricettaForm.controls['nome'].value.replace(/\s\s+/g, ' ').trim(),
          categoria: this.ricettaForm.controls['categoria'].value.replace(/\s\s+/g, ' ').trim(),
          ingrediente_1: undefined,
          persone: 0,
          note: '',
          ingredienti: ing,
          preparazione: this.ricettaForm.controls['preparazione'].value.replace(/\s\s+/g, ' ').trim(),
          immagine_primaria: '',
          visibile: '',
          public: this.ricettaForm.controls['public'].value === "true" ? true : false,
          userId: this.user?.user.id,
          id: this.id

        }
        this.apiSvc.update(newRecipe).subscribe(res => {
          if (res) {
            if (newRecipe.nome) this.newRecipeName = newRecipe.nome
            this.registered = true
          }
        })
      }


    } else {
      Object.values(this.ricettaForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
        this.unmatch = false
        this.match = false

      });
    }
  }

}



