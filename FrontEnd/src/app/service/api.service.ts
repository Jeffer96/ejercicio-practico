import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: String = "http://localhost:4000";
  headers = new HttpHeaders().set('content-type', 'application/json');

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(this.baseUrl + '/');
  }

  addUser(data: any) {
    return this.http.post(this.baseUrl + '/addUser', { data });
  }

}
