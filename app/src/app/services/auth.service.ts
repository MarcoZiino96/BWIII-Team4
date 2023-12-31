import { Injectable } from '@angular/core';
import { iAuthData } from '../Models/auth/i-auth-data';
import { BehaviorSubject, Observable, ObservableInput, Subject, catchError, map, tap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { iRegister } from '../Models/auth/i-register';
import { iPermissions } from '../Models/auth/i-permissions';
import { iRegisterData } from '../Models/auth/i-register-data';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {




  authSubject = new BehaviorSubject<iAuthData | null>(null)
  user$: Observable<iAuthData | null> = this.authSubject.asObservable()
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user))
  adminSubject = new Subject<boolean>()
  isAdmin$: Observable<boolean> = this.adminSubject.asObservable()

  jwtH: JwtHelperService = new JwtHelperService()
  endpoint: string = `${environment.backendUrl}`

  constructor(private http: HttpClient, private router:Router) {
    this.restoreUserSession()
  }

  isAdmin(userId: number): Observable<boolean> {
    return this.http.get<iPermissions[]>(`${this.endpoint}/permissions`).pipe(map(res => {
      const userPermission = res.find(p => p.userId === userId)
      if (userPermission) return userPermission.isAdmin
      return false
    }))
  }

  signUp(register: iRegisterData): Observable<iAuthData> {
    return this.http.post<iAuthData>(`${this.endpoint}/register`, register)
  }

  setUserPermissions(userId: number): Observable<iPermissions> {
    return this.http.post<iPermissions>(`${this.endpoint}/permissions`,
      {
        userId: userId,
        isAdmin: false
      })
  }

  logIn(loginData: iAuthData): Observable<iAuthData> {
    return this.http.post<iAuthData>(`${this.endpoint}/login`, loginData)
      .pipe(tap(data => {
        let isAdmin!: boolean
        this.authSubject.next(data)
        this.isAdmin(data.user.id).pipe(tap(res => isAdmin = res))
        this.adminSubject.next(isAdmin)
        localStorage.setItem('authData', JSON.stringify(data))
      }
      ))
  }


  logOut() {
    this.authSubject.next(null)
    localStorage.removeItem('authData')
    this.router.navigate(['/auth/login'])
  }

  autoLogOut(jwt: string) {
    const expDate = this.jwtH.getTokenExpirationDate(jwt) as Date
    const remainingMs = expDate.getTime() - new Date().getTime()
    setTimeout(this.logOut, remainingMs)
  }

  restoreUserSession() {
    const userJson: string | null = localStorage.getItem('authData')
    if (!userJson) return
    const accessData: iAuthData = JSON.parse(userJson)
    if (this.jwtH.isTokenExpired(accessData.accessToken)) return this.autoLogOut(accessData.accessToken)
    this.authSubject.next(accessData)

  }




}





