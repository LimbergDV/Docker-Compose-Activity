import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../app/customers/models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _apiUrl = 'http://50.19.191.204/customer';

  constructor(private http: HttpClient) { }

  //Métodos para el crud completo de CUSTOMERS

  createCustomer(customer: Customer): Observable<Customer>{
    console.log(customer);

    return this.http.post<Customer>(`${this._apiUrl}/addCustomer`, customer);
  }

  getAllCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this._apiUrl}/getCustomers`);
  }

  updateCustomer(customer:Customer): Observable<Customer>{
    return this.http.put<Customer>(`${this._apiUrl}/updateCustomer/${customer.id_customer}`, customer);
  }

  deleteCustomer(id:number): Observable<void>{
    return this.http.delete<void>(`${this._apiUrl}/deleteCustomer/${id}`);
  }

}
