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

  create(ricetta:Partial<iRicetta>) : Observable<iRicetta>{
    return this.http.post<iRicetta>(environment.apiUrl,ricetta)
  }

  update(ricetta:iRicetta) : Observable<iRicetta>{
    return this.http.put<iRicetta>(`${environment.apiUrl}/${ricetta.id}`,ricetta)
  }

  delete(id:number) : Observable <iRicetta> | undefined{
    return this.http.delete<iRicetta>(`${environment.apiUrl}/${id}`)
  }

  getById(id:number) : Observable<iRicetta>{
    return this.http.get<iRicetta>(`${environment.apiUrl}/${id}`)
  }

}
