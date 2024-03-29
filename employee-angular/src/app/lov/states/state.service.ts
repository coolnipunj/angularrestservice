import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private baseUrl = 'http://localhost:9090/api/v1/lov/states';

  constructor(private http: HttpClient) { }

  getState(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createState(state: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, state);
  }

  updateState(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteState(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getStatesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}