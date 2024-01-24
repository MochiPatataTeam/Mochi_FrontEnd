import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url= 'http://127.0.0.1:8000/api/usuario';

  usuario(): Observable<any>{
    return this.http.get(`${this.url}`);
  }


  constructor(private http: HttpClient) {

  }
}
