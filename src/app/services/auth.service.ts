import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError  } from 'rxjs';
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

  private lista_comentarios ='http://127.0.0.1:8000/api/comentario';
  private lista_respuestas ='http://127.0.0.1:8000/api/respuesta';
  private lista_usuarios= 'http://127.0.0.1:8000/api/usuario';


  private userName: string | null = null;
  private nombreCanal: string | null = null;
  private idUsuario: number | null = null;
  private reloadRequiredSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public reloadRequired$: Observable<boolean> = this.reloadRequiredSubject.asObservable();




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
      imagen: data.imagen // Aquí se incluye la imagen en el payload
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

  getNombreCanal(): string | null {
    return this.nombreCanal;
  }

  isLoggedIn(): boolean{
    const jwt= localStorage.getItem('jwt');

    if(jwt !== null && this.isTokenValid(jwt)){
      const decodedToken: any = JSON.parse(atob(jwt.split('.')[1]));

      this.userName = decodedToken.username;
      this.idUsuario = decodedToken.id;
      this.nombreCanal = decodedToken.nombre_canal;

      return true;
    } else {
      localStorage.removeItem('jwt');
      this.removeAuthId()
      localStorage.removeItem('seccionElegida');
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
    this.removeAuthId();
    localStorage.removeItem('seccionElegida');
    this.router.navigate(['/Inicio']);
  }

  //despues del login
  setReloadRequired(reload: boolean): void {
    this.reloadRequiredSubject.next(reload);
  }

  //----------------------------- PERFIL -----------------------------------

  //Perfil usuario logueado
  getUsuariobyId(id: number): Observable<any> {
    return this.http.get(`${this.urlGeneral}/api/usuario/${id}`);
  }

  setAuthCanal(nombre_canal: string) {
    this.nombreCanal = nombre_canal;
    localStorage.setItem('nombre_canal', nombre_canal);
  }

  getStoredCanal(): string | null {
    const storedCanal = localStorage.getItem('nombre_canal');
    if (storedCanal !== null) {
      return storedCanal;
    }
    return null;
  }

  removeAuthCanal() {
    this.nombreCanal = null;
    localStorage.removeItem('nombre_canal');
  }

  //Perfil a traves de video
  getUsuariobyCanal(canal: string): Observable<any> {
    return this.http.get(`${this.urlGeneral}/api/usuario/canal/${canal}`);
  }

  //Editar perfil
  perfilEdit(id: number, datos: any): Observable<any>{
    return this.http.put(`${this.urlGeneral}/api/usuario/${id}`, datos);
  }

  //Get priv usuario por id
  getPrivByUsuariId(id: number): Observable<any> {
    return this.http.get(`${this.urlGeneral}/api/privacidad/${id}`);
  }

  //Get priv usuario por canal
  getPrivByUsuariCanal(canal: string): Observable<any> {
    return this.http.get(`${this.urlGeneral}/api/privacidad/canal/${canal}`);
  }

  //Get videos del usuario por Id
  getVideosByIDCanal(id: number): Observable<any>{
    return this.http.get(`${this.urlGeneral}/api/video/canalId/${id}`);
  }

  //Get videos del usuario por Nombre Canal
  getVideosByNombreCanal(canal: string): Observable<any>{
    return this.http.get(`${this.urlGeneral}/api/video/canalNombre/${canal}`);
  }

  subs(id_suscritor: number, id_canal: number): Observable<any> {
    return this.http.post(`${this.urlGeneral}/api/suscripcion/sub/${id_suscritor}/${id_canal}`, {});
  }

  comprobar_subs(id_suscritor: number, id_canal: number): Observable<any> {
    return this.http.get(`${this.urlGeneral}/api/suscripcion/comprobar/${id_suscritor}/${id_canal}`);
  }

  visualizacion(id_video: number, id_usuario: number): Observable<any> {
    return this.http.post(`${this.urlGeneral}/api/valoracion/visual/${id_video}/${id_usuario}`, {});
  }
  visualizacionSinUser(id_video: number): Observable<any> {
    return this.http.post(`${this.urlGeneral}/api/valoracion/visual/${id_video}`, {});
  }

  subsTotalesPerfil(id_canal: number): Observable<any> {
    return this.http.get(`${this.urlGeneral}/api/suscripcion/substotales/${id_canal}`);
  }

  subsTotalesReproduccion(id_canal: string): Observable<any> {
    return this.http.get(`${this.urlGeneral}/api/suscripcion/substotalesReproduccion/${id_canal}`);
  }

  comprobarlikesporvideo(id_video: number, id_usuario: number):Observable<any> {
    return this.http.post(`${this.urlGeneral}/api/valoracion/comprobar/fav/${id_video}/${id_usuario}`, {});
  }

  darLike(id_video: number, id_usuario: number):Observable<any> {
    return this.http.post(`${this.urlGeneral}/api/valoracion/favorito/${id_video}/${id_usuario}`, {});
  }

  comprobardislikesporvideo(id_video: number, id_usuario: number):Observable<any> {
    return this.http.post(`${this.urlGeneral}/api/valoracion/comprobar/dislike/${id_video}/${id_usuario}`, {});
  }

  dardisLike(id_video: number, id_usuario: number):Observable<any> {
    return this.http.post(`${this.urlGeneral}/api/valoracion/dislike/${id_video}/${id_usuario}`, {});
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

  buscarTitulo(titulo: string): Observable<any> {

    const url = `${this.urlGeneral}/api/video/listarTitulo`;

    const params = {
      titulo: titulo
    };

    const options = {
      params: params
    };

    return this.http.get(url, options);
  }

  buscarCanales(canal: string): Observable<any> {

    const url = `${this.urlGeneral}/api/video/listarCanales`;

    const params = {
      nombre_canal: canal
    };

    const options = {
      params: params
    };

    return this.http.get(url, options);
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
  buscarUsername(username: string): Observable<any> {

    const url = `${this.urlGeneral}/api/usuario/buscarId`;

    const params = {
      username: username
    };

    const options = {
      params: params
    };

    return this.http.get(url, options);
  }
  buscarIdCanal(canal: string): Observable<any> {

    const url = `${this.urlGeneral}/api/usuario/buscarIdCanal`;

    const params = {
      nombre_canal: canal
    };

    const options = {
      params: params
    };

    return this.http.get(url, options);
  }
  tematicas(): Observable<any> {
    return this.http.get(`${this.urlGeneral}/api/tematica`);
  }
  crearVideo(titulo: string,descripcion:string,url:string,id_canal:number,tematica:string): Observable<any>{
    const credentials = {
      titulo: titulo,
      descripcion: descripcion,
      url: url,
      canal: id_canal,
      tematica: tematica,
    };
    return this.http.post(`${this.urlGeneral}/api/video`, credentials);
  }
  modificarVideo(id:number,titulo: string,descripcion:string,url:string,id_canal:number,tematica:string): Observable<any> {
    const credentials = {
      titulo: titulo,
      descripcion: descripcion,
      url: url,
      canal: id_canal,
      tematica: tematica,
    };
    return this.http.put(`${this.urlGeneral}/api/video/${id}`, credentials);
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
  buscarSubs(id: number): Observable<any> {

    const url = `${this.urlGeneral}/api/suscripcion/subs`;

    const params = {
      id_canal: id
    };

    const options = {
      params: params
    };

    return this.http.get(url, options);
  }
  notificaciones(id: number): Observable<any> {
    return this.http.get(`${this.urlGeneral}/api/notificacion/${id}`);
  }
  notificacionesCrear(id_usuario:number,id_tipo:number,id_creador:number): Observable<any> {
    const credentials = {
      usuario: id_usuario,
      tipo: id_tipo,
      id_creador: id_creador
    };
    return this.http.post(`${this.urlGeneral}/api/notificacion`, credentials);
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
  eliminarVideo(id:number): Observable<any> {

    return this.http.delete(`${this.urlGeneral}/api/video/${id}`);
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

  listTodoBySuscripcion(id: number): Observable<any>{
    return this.http.get(`${this.urlGeneral}/api/video/videosSuscripciones/${id}`);
  }

  listVideosPopulares():Observable<any>{
    return this.http.get(`${this.urlGeneral}/api/video/populares`);
  }

  listSusyTematica(id_suscripcion:number, tematica:string): Observable<any>{
    return this.http.get(`${this.urlGeneral}/api/video/sugerencias/${id_suscripcion}/${tematica}`);
  }

  listTematicaByName(tematica:string): Observable<any>{
    return this.http.get(`${this.urlGeneral}/api/video/tematica/nombre/${tematica}`);
  }

}
