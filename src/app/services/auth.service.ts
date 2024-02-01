import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) {}

  private urlGeneral= 'https://127.0.0.1:8000';
  private videolista = 'https://127.0.0.1:8000/api/video';
  
  private lista_comentarios ='https://127.0.0.1:8000/api/comentario'
  private lista_respuestas ='https://127.0.0.1:8000/api/respuesta'
  private lista_usuarios= 'https://127.0.0.1:8000/api/usuario';


  private userName: string | null = null;
  private idUsuario: number | null = null;



  usuario(): Observable<any>{
    return this.http.get(`${this.lista_usuarios}`);
  }
  comentario(): Observable<any>{
    return this.http.get(`${this.lista_comentarios}`)
  }
  video(): Observable<any> {
    return this.http.get(`${this.videolista}`);
  }

  respuesta():Observable<any>{
    return this.http.get(`${this.lista_respuestas}`)
  }

  //----------------------------- REGISTRO -----------------------------------
  registrar(data:any): Observable<any>{
    let payload = {
      nombre: data.nombre,
      apellidos: data.apellidos,
      username: data.username,
      password: data.password,
      email: data.email,
      telefono: data.telefono,
      nombre_canal: data.nombre_canal,
      descripcion: data.descripcion,
    };

    return this.http.post(`${this.urlGeneral}/api/registro`, payload);
  }

  //----------------------------- LOGIN Y LOGOUT -----------------------------------
  getUsername(): string | null { //Para obtener el username como variable y poder mostrarlo
    return this.userName;
  }

  getId(): number | null { //Para obtener el id como variable y poder mostrarlo
    return this.idUsuario;
  }

  isLoggedIn(): boolean{
    const jwt= localStorage.getItem('jwt');

    if(jwt !== null && this.isTokenValid(jwt)){
      const decodedToken: any = JSON.parse(atob(jwt.split('.')[1]));

      this.userName = decodedToken.username;
      this.idUsuario = decodedToken.idUsuario;

      return true;
    } else {
      localStorage.removeItem('jwt');
      return false;
    }
  }

  private isTokenValid(token: string): boolean {
    // Aquí simplemente asumimos que el token es válido si está presente.
    return true;
  }

  login(username: string, password: string): Observable<any>{
    return this.http.post(`${this.urlGeneral}/api/login_check`, {username, password});
  }

  logout(): void{
    localStorage.removeItem('jwt');
    this.router.navigate(['/Inicio']);
  }

  //----------------------------- RECUPERAR CONTRASEÑA -----------------------------------
  requestPasswordReset(email: string): Observable<any>{ //donde agarra el email para enviarselo al backend
    const data= { email: email};
    return this.http.post(`${this.urlGeneral}/api/resetPassword`, data);
  }

  resetPassword(token: string, newPassword: string): Observable<any>{ //donde agarra la nueva contraseña y el token para verificarlo y setearlo al backend.
    const url = `${this.urlGeneral}/reset/${token}`;                  //(Haciendo referencia al metodo de mi backend que me modifica la contraseña)
    const body = { newPassword };
    return this.http.post(url, body);
  }


  //----------------------------- MENSAJES -----------------------------------
  mensajes(id: number, id2: number): Observable<any> {
    return this.http.get(`${this.urlGeneral}/api/mensajes/${id}/${id2}`);
  }

  contactos(id: number): Observable<any> {
    return this.http.get(`${this.urlGeneral}/api/mensajes/${id}`);
  }

  enviarMensaje(mensaje: string,fecha:string,idEmisor:number,idReceptor:number): Observable<any>{
    const credentials = {
      mensaje: mensaje,
      fecha: fecha,
      id_emisor: idEmisor,
      id_receptor: idReceptor,
    };
    return this.http.post(`${this.urlGeneral}/api/mensajes`, credentials);
  }

}
