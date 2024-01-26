import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private lista_usuarios= 'http://127.0.0.1:8000/api/usuario';
  private lista_comentarios ='http://127.0.0.1:8000/api/comentario'
  private lista_respuestas ='http://127.0.0.1:8000/api/respuesta'
  usuario(): Observable<any>{
    return this.http.get(`${this.lista_usuarios}`);
  }
  comentario(): Observable<any>{
    return this.http.get(`${this.lista_comentarios}`)
  }

  respuesta():Observable<any>{
    return this.http.get(`${this.lista_respuestas}`)
  }

  constructor(private http: HttpClient) {

  }
}
