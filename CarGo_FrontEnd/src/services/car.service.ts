import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../app/cars/models/car';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private _apiUrl = 'http://50.19.191.204/car';

  constructor(private http: HttpClient) { }

  //Métodos para el crud completo de CARS

  createCar(car: Car):Observable<Car>{
    console.log(car);
    return this.http.post<Car>(`${this._apiUrl}/addCar`, car);
  }

  getAllCars():Observable<Car[]>{
    return this.http.get<Car[]>(`${this._apiUrl}/getCars`);
  }

  updateCars(car:Car):Observable<Car>{
    return this.http.put<Car>(`${this._apiUrl}/updateCar/${car.id_car}`, car);
  }

  deleateCar(id:number): Observable<void>{
    return this.http.delete<void>(`${this._apiUrl}/deleteCar/${id}`);
  }
}
