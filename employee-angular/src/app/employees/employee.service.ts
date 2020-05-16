import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from "./employee";

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  //private baseUrl = 'http://localhost:9090/api/v1/employees';
  //private baseUrl = 'http://localhost:9090/api/v1/employees';
  private apiRoot = environment.apiRoot;
  page = '/employees';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.apiRoot}${this.page}/${id}`);
  }

  createEmployee(employee: Object): Observable<Object> {
    return this.http.post(`${this.apiRoot}${this.page}`, employee);
  }

  updateEmployee(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.apiRoot}${this.page}/${id}`, value);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiRoot}${this.page}/${id}`, { responseType: 'text' });
  }

  getEmployeesList(): Observable<any> {
    return this.http.get(`${this.apiRoot}${this.page}`);
  }


  search(params): Observable<Employee[]> {
    console.log('Params in service for search=' + params);
    const url = `${this.apiRoot}${this.page}/search`;
    return this.http.post<Employee[]>(url, params, this.httpOptions);
  }

}