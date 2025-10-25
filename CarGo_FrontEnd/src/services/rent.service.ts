import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rent } from '../app/rents/models/rent';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  private _apiUrl = 'http://50.19.191.204/rent';

  constructor(private http: HttpClient) { }

  createRent(rent: Rent): Observable<Rent>{
    return this.http.post<Rent>(`${this._apiUrl}/addRent`, rent);
  }

  getAllRents(): Observable<Rent[]>{
    return this.http.get<Rent[]>(`${this._apiUrl}/getAllRents`)
  }

  updateRent(rent: Rent): Observable<Rent>{
    return this.http.put<Rent>(`${this._apiUrl}/updateRent/ ${rent.id_rent}`, rent)
  }

  deleteRent(id: number): Observable<void>{
    return this.http.delete<void>(`${this._apiUrl}/deleteRent/${id}`)
  }

}
