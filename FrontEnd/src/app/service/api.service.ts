import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from 'util';

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

  getUsersByFilter(param: string) {
    return this.http.get(this.baseUrl + '/getUsersLikeName/' + param);
  }

  addUser(data: any) {

    return this.http.post(this.baseUrl + '/addUser', { data });
  }

  deleteUser(id) {
    let urlDel = this.baseUrl + '/delete/' + id;
    return this.http.delete(urlDel, { headers: this.headers });
  }

  getUserById(id) {
    let urlGet = this.baseUrl + '/getUser/' + id;
    return this.http.get(urlGet, { headers: this.headers });
  }

  updateUser(id, data) {
    let url = this.baseUrl + '/updateUser/' + id;
    return this.http.put(url, data, { headers: this.headers })
  }

}
