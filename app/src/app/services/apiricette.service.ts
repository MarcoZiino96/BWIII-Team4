import { iRicetta } from './../Models/iricetta';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class APIricetteService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<iRicetta[]>{
    return this.http.get<iRicetta[]>(environment.apiUrl)
  }
  getByCat(categoria:string): Observable<iRicetta[]> | undefined{
    return this.http.get<iRicetta[]>(`${environment.apiUrl}?categoria=${categoria}`)
  }

}
