import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { APIricetteService } from '../../services/apiricette.service';
import { iRicetta } from '../../Models/iricetta';
import { iUser } from '../../Models/auth/i-user';
import { iAuthData } from '../../Models/auth/i-auth-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent {

  @Input() mode!: string // mode = 'create' oppure 'edit'
  @Input() id!: number


  options!: string[]

  onceDirty: boolean = true

  currentRecipe!: iRicetta

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






  ricettaForm!: FormGroup

  color: string = ''

  valid!: boolean
  errorMsg!: any

  msg!: any

  unmatch: boolean = false
  match: boolean = false
  categories: string[] = []
  user!: iAuthData


  ngOnInit() {
    this.apiSvc.getAllCat().subscribe(res => this.options = res)
    this.authSvc.user$.subscribe(res => res ? this.user = res : undefined)
    if (this.id) {
      this.apiSvc.getById(this.id).subscribe(res => {

        const ing = res.ingredienti.map((i: string, ind: number) => {
          if (ind !== 0) {
            i = i.padStart(1, ',')
            i = i.padStart(1, ' ')
          }
        })

        this.ricettaForm = this.fb.group({
          nome: this.fb.control(res.nome, [Validators.required]),
          ingredienti: this.fb.control(null, [Validators.required, Validators.pattern(/^([a-z0-9\s]+,)*([a-z0-9\s]+){1}$/i)]),
          categoria: this.fb.control(null, [Validators.required]),
          preparazione: this.fb.control(null, [Validators.required, Validators.minLength(25)]),
          public: this.fb.control("true")
        })

      })
    } else {
      this.ricettaForm = this.fb.group({
        nome: this.fb.control(null, [Validators.required]),
        ingredienti: this.fb.control(null, [Validators.required, Validators.pattern(/^([a-z0-9\s]+,)*([a-z0-9\s]+){1}$/i)]),
        categoria: this.fb.control(null, [Validators.required]),
        preparazione: this.fb.control(null, [Validators.required, Validators.minLength(25)]),
        public: this.fb.control("true")
      })
    }
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

  listOfOption: string[] = ['a10']
  listOfSelectedValue = ['a10', 'c12']

  options2: string[] = ['a', 'aa', 'aaa']

  newRecipe() {
    this.ricettaForm.reset()
    this.ricettaForm.controls['public'] = this.fb.control("true")
    this.registered = false
  }

  registered: boolean = false

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

  emailValidator(fieldName: string): boolean {
    const field: AbstractControl | null = this.ricettaForm.get(fieldName)
    //const regex = new RegExp()
    //if (this.loginForm.value.email) return regex.test.(this.loginForm.value.email)
    return false
  }

  isValid(fieldName: string) {
    return this.ricettaForm.get(fieldName)?.valid && this.ricettaForm.get(fieldName)?.dirty
  }

  isInvalid(fieldName: string) {
    return !this.ricettaForm.get(fieldName)?.valid && this.ricettaForm.get(fieldName)?.dirty
  }

  newRecipeName!: string

  register(): void {
    if (this.ricettaForm.valid) {

      const ing = this.ricettaForm.controls['ingredienti'].value.split(',')
        .map((i: string) => i.replace(/\s\s+/g, ' ').trim()).filter((i: string) => i)

      const newRecipe: Partial<iRicetta> = {
        nome: this.ricettaForm.controls['nome'].value.replace(/\s\s+/g, ' ').trim(),
        categoria: this.ricettaForm.controls['categoria'].value.replace(/\s\s+/g, ' ').trim(),
        ingrediente_1: undefined,
        persone: 0,
        note: '',
        ingredienti: ing,
        preparazione: '',
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




  showModal1(): void {
    this.isVisible1 = true
  }

  handleOk1(): void {
    this.isVisible1 = false
  }
  isVisible1 = false
  isVisible2 = false
  showModal2(): void {
    this.isVisible2 = true
  }

  handleOk2(): void {
    this.isVisible2 = false
  }
  constructor(private fb: FormBuilder, private authSvc: AuthService, private apiSvc: APIricetteService,
    private router: Router) { }


}
