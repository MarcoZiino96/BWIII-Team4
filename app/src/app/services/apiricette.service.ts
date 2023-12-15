import { iRicetta } from './../Models/iricetta';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class APIricetteService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<iRicetta[]> {
    return this.http.get<iRicetta[]>(environment.apiUrl)
  }

  getByCat(categoria: string): Observable<iRicetta[]> | undefined {
    return this.http.get<iRicetta[]>(`${environment.apiUrl}?categoria=${categoria}`)
  }

  getAllCat(): Observable<string[]> {
    return this.getAll().pipe(map(res => {
      const categories: string[] = []
      res.forEach(el => {
        if (!categories.includes(el.categoria)) categories.push(el.categoria)
      })
      return categories
    }))
  }

  getIngredients(query: string, limit: number): Observable<string[]> {
    let ingredienti: string[] = []
    let cont = 0
    const generateRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
    return this.http.get<iRicetta[]>(`${environment.apiUrl}?ingredienti_like=${query}&_limit=${limit}`).pipe(map(res => {
      res.forEach(r => r.ingredienti.forEach(i => ingredienti.push(i)))
      ingredienti = ingredienti.filter(i => {
        if (generateRandomNumber(0, 100) >= 80 && cont < limit) {
          cont++
          return true
        }
        return false

      })
      return ingredienti
    }))
  }

  searchByName(query: string, limit: number): Observable<iRicetta[]> {
    return this.http.get<iRicetta[]>(`${environment.apiUrl}?nome_like=${query}&_limit=${limit}`)
  }

  create(ricetta: Partial<iRicetta>): Observable<iRicetta> {
    return this.http.post<iRicetta>(environment.apiUrl, ricetta)
  }

  update(ricetta: iRicetta): Observable<iRicetta> {
    return this.http.put<iRicetta>(`${environment.apiUrl}/${ricetta.id}`, ricetta)
  }

  deleteById(id: number): Observable<iRicetta> | undefined {
    return this.http.delete<iRicetta>(`${environment.apiUrl}/${id}`)
  }

  getById(id: number): Observable<iRicetta> {
    return this.http.get<iRicetta>(`${environment.apiUrl}/${id}`)
  }

  getAllByUserId (userId: number){
    return this.http.get<iRicetta[]>(`${environment.apiUrl}?userId=${userId}`)
  }

  getImgByCategories(categoria: string): string {
    switch (categoria) {
      case 'Antipasto':
        return '../../../assets/img/antipasto.png';
      case 'Pollame':
        return '../../../assets/img/pollame.png';
      case 'Pesce':
        return '../../../assets/img/pesce.png';
      case 'Carne':
        return '../../../assets/img/carne.png';
      case 'Bevande':
        return '../../../assets/img/bevande.png';
      case 'Salsa':
        return '../../../assets/img/salse.png';
      case 'Contorno':
        return '../../../assets/img/contorno.png';
      case 'Dessert':
        return '../../../assets/img/dessert.png';
      case 'Primo':
        return '../../../assets/img/primo.png';
      default:
        return 'https://picsum.photos/200/300?random=1';
    }
  }

}
