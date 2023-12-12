import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { iLoginData } from '../../../Models/auth/i-login-data';
import { iRegister } from '../../../Models/auth/i-register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  firstCapitalLetters: ValidatorFn = (formField: AbstractControl): ValidationErrors | null => {
    if (formField.value) {
      const stringToCheck: string = formField.value.replace(/\s\s+/g, ' ').trim()
      const arrString: string[] = stringToCheck.split(' ')
      const regex = new RegExp(/^[A-Z]/)
      for (let i: number = 0; i < arrString.length; i++) {
        if (!regex.test(arrString[i])) return { firstCapitalLetters: true }
      }
      return null
    }
    return { firstCapitalLetters: true }
  }



  registerForm: FormGroup = this.fb.group({
    name: this.fb.control(null, [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]*$/), this.firstCapitalLetters]),
    surname: this.fb.control(null, [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]*$/), this.firstCapitalLetters]),
    email: this.fb.control(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: this.fb.control(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: this.fb.control(null, [Validators.required])
  })

  color: string = ''

  valid!: boolean
  errorMsg!: iRegister
  validMsg!: iLoginData
  msg!: iRegister

  unmatch: boolean = false
  match: boolean = false



  ngDoCheck() {

    this.errorMsg = {
      name: this.setInvalidMessages('name'),
      surname: this.setInvalidMessages('surname'),
      email: this.setInvalidMessages('email'),
      password: this.setInvalidMessages('password'),
      confirmPassword: (this.registerForm.controls['confirmPassword'].value !== this.registerForm.controls['password'].value) && (this.registerForm.controls['confirmPassword'].dirty) ? 'Mancata corrispondenza' : this.setInvalidMessages('confirmPassword')
    }
    console.log(this.registerForm)
    this.msg = {
      email: '',
      password: '',
      name: '',
      surname: '',
      confirmPassword: ''
    }

    if (this.registerForm.controls['confirmPassword'].value !== this.registerForm.controls['password'].value && this.registerForm.controls['confirmPassword'].dirty) {
      this.unmatch = true
    } else {
      this.unmatch = false
    }

    if (this.registerForm.controls['confirmPassword'].value === this.registerForm.controls['password'].value && this.registerForm.controls['confirmPassword'].dirty) {
      this.match = true
    } else {
      this.match = false
    }

    if (this.errorMsg.name) {
      this.msg.name = this.errorMsg.name
    } else {
      this.msg.name = 'Campo compilato correttamente'
    }

    if (this.errorMsg.surname) {
      this.msg.surname = this.errorMsg.surname
    } else {
      this.msg.surname = 'Campo compilato correttamente'
    }

    if (this.errorMsg.email) {
      this.msg.email = this.errorMsg.email
    } else {
      this.msg.email = 'Campo compilato correttamente'
    }

    if (this.errorMsg.password) {
      this.msg.password = this.errorMsg.password
    } else {
      this.msg.password = 'Campo compilato correttamente'
    }

    if (this.errorMsg.confirmPassword) {
      this.msg.confirmPassword = this.errorMsg.confirmPassword
    } else {
      this.msg.confirmPassword = 'Le due password combaciano'
    }




    this.valid = this.registerForm['valid']
  }

  isUnmatched(): boolean {
    return this.unmatch && this.registerForm.controls['confirmPassword'].dirty
  }


  ngOnInit() {
    console.log(this.unmatch)
  }


  setInvalidMessages(fieldName: string): string {
    const field: AbstractControl | null = this.registerForm.get(fieldName)
    let errorMsg: string = ''
    if (field) {
      if (field.errors) {
        if (field.errors['required']) errorMsg = 'Campo vuoto'
        if (field.errors['pattern'] && fieldName === 'email') errorMsg = 'Formato email errato'
        if (field.errors['firstCapitalLetters'] && field.value?.length >= 2 && (fieldName === 'name' || fieldName === 'surname')) errorMsg = 'Iniziale minuscola'
        if (field.errors['minlength'] && fieldName === 'password') errorMsg = 'Lunghezza minima password: 6 caratteri'
        if (field.errors['minlength'] && (fieldName === 'name' || fieldName === 'surname')) errorMsg = 'Lunghezza minima: 2 caratteri'
        if (field.errors['pattern'] && (fieldName === 'name' || fieldName === 'surname')) errorMsg = 'Sono ammesse solo lettere dell\'alfabeto'

      }

    }
    return errorMsg
  }

  emailValidator(fieldName: string): boolean {
    const field: AbstractControl | null = this.registerForm.get(fieldName)
    //const regex = new RegExp()
    //if (this.loginForm.value.email) return regex.test.(this.loginForm.value.email)
    return false
  }

  isValid(fieldName: string) {
    return this.registerForm.get(fieldName)?.valid && this.registerForm.get(fieldName)?.dirty
  }

  isInvalid(fieldName: string) {
    return !this.registerForm.get(fieldName)?.valid && this.registerForm.get(fieldName)?.dirty
  }

  logIn(): void {
    if (this.registerForm.valid) {
      this.authSvc.logIn(this.registerForm.value).subscribe(

        res => {
          if (this.router.url === '/') this.router.navigate(['/my-gmeteo'])
        },
        err => {
          this.valid = false
          if (err.status === 400 && err.error === "Cannot find user") {
            this.showModal1()
          } else {
            this.showModal2()
          }
        }
      )
    } else {
      Object.values(this.registerForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
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
  constructor(private fb: FormBuilder, private authSvc: AuthService, private router: Router) { }



}
