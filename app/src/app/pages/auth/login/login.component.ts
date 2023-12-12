import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { iLoginData } from '../../../Models/auth/i-login-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({
    email: this.fb.control(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: this.fb.control(null, [Validators.required, Validators.minLength(6)])
  })

  color: string = ''

  valid!: boolean
  errorMsg!: iLoginData
  validMsg!: iLoginData
  msg!: iLoginData





  ngDoCheck() {
    this.errorMsg = {
      email: this.setInvalidMessages('email'),
      password: this.setInvalidMessages('password')
    }
    console.log(this.loginForm)
    this.msg = {
      email: '',
      password: ''
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



    this.valid = this.loginForm['valid']
  }


  setInvalidMessages(fieldName: string): string {
    const field: AbstractControl | null = this.loginForm.get(fieldName)
    let errorMsg: string = ''
    if (field) {
      if (field.errors) {
        if (field.errors['required']) errorMsg += 'Campo vuoto'
        if (field.errors['pattern']) errorMsg += 'Formato email errato'
        if (field.errors['minlength']) errorMsg += 'Lunghezza minima password: 6 caratteri'
      }

    }
    return errorMsg
  }

  emailValidator(fieldName: string): boolean {
    const field: AbstractControl | null = this.loginForm.get(fieldName)
    //const regex = new RegExp()
    //if (this.loginForm.value.email) return regex.test.(this.loginForm.value.email)
    return false
  }

  isValid(fieldName: string) {
    return this.loginForm.get(fieldName)?.valid && this.loginForm.get(fieldName)?.dirty
  }

  isInvalid(fieldName: string) {
    return !this.loginForm.get(fieldName)?.valid && this.loginForm.get(fieldName)?.dirty
  }

  logIn(): void {
    if (this.loginForm.valid) {
      this.authSvc.logIn(this.loginForm.value).subscribe(

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
      Object.values(this.loginForm.controls).forEach(control => {
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
