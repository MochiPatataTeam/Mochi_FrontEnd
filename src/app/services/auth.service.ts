import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError  } from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
//import {videoDTO} from "../ventanas/ventana-reproduccion/videoDto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) {}

  private urlGeneral= 'http://127.0.0.1:8000';
  private videolista = 'http://127.0.0.1:8000/api/video';

  private lista_comentarios ='http://127.0.0.1:8000/api/comentario'
  private lista_respuestas ='http://127.0.0.1:8000/api/respuesta'
  private lista_usuarios= 'http://127.0.0.1:8000/api/usuario';


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
  videoid(id: number): Observable<any> {
    return this.http.get(`${this.videolista}/listarId/${id}`);
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
      this.idUsuario = decodedToken.id;

      return true;
    } else {
      localStorage.removeItem('jwt');
      this.removeAuthId()
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
    this.removeAuthId()
    this.router.navigate(['/Inicio']);
  }
  //----------------------------- PERFIL -----------------------------------

  getUsuariobyId(id: number): Observable<any> {
    return this.http.get(`${this.urlGeneral}/api/usuario/${id}`);
  }


  //----------------------------- VERIFICACION -----------------------------------

  verifyEmail(params: any){
    return this.http.get<any>(`${this.urlGeneral}/api/registro/verify`, {params: params});
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

  //----------------------------- MANEJO DE ERRORES -----------------------------------

  // errores(){
  //   const urlErrorLogin = 'https://127.0.0.1:8000/api/login_check'

  //   return this.http.get(urlErrorLogin)
  //     .pipe(
  //       catchError((error => {
  //         return throwError(error);
  //       }))
  //     )
  // }


  public handleError(err: HttpErrorResponse){
    let errorMessage: string;

    if(err.error instanceof ErrorEvent){
      //ocurrio un error del cliente
      errorMessage= `Un error ocurrio: ${err.error.message}`;
    } else {
      //backend
      // errorMessage = `Algo ocurrio`;
      switch (err.status) {
        case 403:
          errorMessage = `${err.status}: Nose no funciona`;
          break;
        default:
          errorMessage = `Algo ocurrio`;
      }
    }
    this.router.navigate(['/error'], { state: { message: errorMessage } });
  }


  //----------------------------- MENSAJES -----------------------------------

  setAuthId(idUsuario: number) {
    this.idUsuario = idUsuario;
    localStorage.setItem('Id', idUsuario.toString());
  }

  getStoredIdUsuario(): number | null {
    const storedId = localStorage.getItem('Id');
    if (storedId !== null) {
      return parseInt(storedId, 10);
    }
    return null;
  }
  removeAuthId() {
    this.idUsuario = null;
    localStorage.removeItem('Id');
  }

  mensajes(id: number, id2: number): Observable<any> {
    const url = `${this.urlGeneral}/api/mensajes/mensaje`;

    const params = {
      id: id,
      id2: id2
    };

    const options = {
      params: params
    };

    return this.http.get(url, options);
  }

  contactos(id: number): Observable<any> {

    const url = `${this.urlGeneral}/api/mensajes/contactos`;

    const params = {
      id: id
    };

    const options = {
      params: params
    };

    return this.http.get(url, options);
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

  notificaciones(id: number): Observable<any> {
    return this.http.get(`${this.urlGeneral}/api/notificacion/${id}`);
  }
  notificacionesEdit(id: number,id_usuario:number,id_tipo:number, visible:boolean,id_creador:number): Observable<any> {
    const credentials = {
      visible: visible,
      id_usuario: id_usuario,
      id_tipo: id_tipo,
      id_creador: id_creador
    };
    return this.http.put(`${this.urlGeneral}/api/notificacion/${id}`, credentials);
  }
  //-----COMENTARIOS Y RESPUESTAS
  crearComentario(usuario: number, video:number, comentario:string): Observable<any>{
    const credentials={
      usuario: usuario,
      video: video,
      comentario:comentario,
    };
    return this.http.post(`${this.urlGeneral}/api/comentario`, credentials);
  }

  crearRespuesta(usuario: number, comentario:number, mensaje:string): Observable<any>{
    const credentials ={
      usuario: usuario,
      comentario: comentario,
      mensaje: mensaje
    }
    return this.http.post(`${this.urlGeneral}/api/respuesta`, credentials);
  }
  buscarId(id:number): Observable<any>{

    return this.http.get(`${this.urlGeneral}/api/video/usuario/${id}`);
  }

}
