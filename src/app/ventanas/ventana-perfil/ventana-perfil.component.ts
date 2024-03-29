import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ventana-perfil',
  templateUrl: './ventana-perfil.component.html',
  styleUrls: ['./ventana-perfil.component.css']
})
export class VentanaPerfilComponent implements OnInit{

  wallpaperDefault: string = `url('../../../assets/imagenes/wallpaper_Mochi/Mochi.jpg')`;

  hovered: boolean = false;
  usuarioLogueadoCanal = localStorage.getItem('nombre_canal');
  usuarioLogueadoId = JSON.parse(localStorage.getItem('Id')!);
  canal_url = this.route.snapshot.paramMap.get('nombreCanal') ?? '';

  usuario: any; //usuario logueado
  canal: any; //perfil al que se accede desde un video
  canalLogueado!: string | null;
  videos: any;
  privacidadUsuarioId: any;
  privacidadUsuarioCanal: any;
  substotales: any;
  fechaFormateada!: string;
  mensaje: string = '';
  botonHabilitado: boolean = false;
  id!: number | null;
  subs: boolean ;

  numSuscriptores: number = 0;


  constructor(private authService: AuthService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router) {}

  onWallpaperChanged(event: string): void {
    this.wallpaperDefault = event;
  }

  ngOnInit(): void {
    this.canalLogueado = this.authService.getStoredCanal() || 'no funsiona. Chipi chipi chapa chapa dubidubi dabadaba';
    this.id = this.authService.getStoredIdUsuario() || 0;

    if (this.canal_url && this.canal_url !== this.usuarioLogueadoCanal) { //si el nombre del canal de la url es nulo o es diferente del nombre canal del usuario logueado
      this.cargarDatosByCanal(this.canal_url);
      // this.comprobar_suscripcion();
    } else {
      this.cargarDatosById(this.usuarioLogueadoId);
    }
  }

  cargarDatosByCanal(canal: string): void{
    this.authService.getUsuariobyCanal(canal).subscribe(
      (data) => {
        this.canal = data;
        this.getPrivacidadUsuarioCanal(canal);
        this.comprobar_suscripcion();
        this.totalSuscriptores(this.canal.id);
        this.authService.getVideosByNombreCanal(canal).subscribe(
          (video) => {
            this.videos = Object.values(video);
            this.sanitizarUrls();
          }
        )
      }
    );
  }


  cargarDatosById(userId: number): void{
    this.authService.getUsuariobyId(userId).subscribe(
      (response) => {
        this.usuario = response;
        this.getPrivacidadUsuarioId(userId);
        this.privacidadUsuarioId = response.privacidadUsuarioId;
        this.cargarVideosById(userId);
        this.totalSuscriptores(this.usuario.id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cargarVideosById(userId: number): void{
    this.authService.getVideosByIDCanal(userId).subscribe(
      (video) => {
        this.videos = this.videos = Object.values(video);
        this.sanitizarUrls();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sanitizarUrls() {
    for (const vi of this.videos) {
      vi.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vi.url);
    }
  }

  videoDetails(id: number) {
    this.router.navigate(['reproducir', id]);
  }

  getPrivacidadUsuarioCanal(canal:string): void{
    this.authService.getPrivByUsuariCanal(canal).subscribe(
      (privacidad) => {
        this.privacidadUsuarioCanal = privacidad;
      },
      (error) => {
        console.error('No se pudo obtener la privacidad del canal', error);
      }
    );
  }

  getPrivacidadUsuarioId(userId: number): void{
    this.authService.getPrivByUsuariId(userId).subscribe(
      (privacidadUsuario) => {
        this.privacidadUsuarioId = privacidadUsuario;
      },
      (error) => {
        console.error('No se pudo obtener la privacidad del canal', error);
      }
    );
  }


  //----------------- MENSAJE ---------------
  actualizarEstadoBoton() {
    this.botonHabilitado = this.mensaje.trim() !== '';
  }

  enviarMensaje(mensaje: string,idCanal: number) {
    const fechaActual = new Date();
    this.fechaFormateada = `${fechaActual
      .getDate()
      .toString()
      .padStart(2, '0')}/${(fechaActual.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${fechaActual.getFullYear()}`;

    if (this.id != null) {
      this.authService
        .enviarMensaje(mensaje, this.fechaFormateada, this.id, idCanal)
        .subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );

      this.mensaje = '';

    }
  }

  //----------------- SUSCRIPCIONES ---------------
  suscripcion(canal: any) {
    console.log(canal);
    this.authService.subs(this.id!, this.canal.id).subscribe(
      (data) => {
        this.subs = data.prueba;
        window.location.reload();

        if (this.id != null) {
          this.authService.comprobar_subs(this.id, this.canal.id).subscribe(
            (data) => {
              this.subs = data.prueba;

              if (data.prueba === false) {
                console.log("entro en false")
              }
              if (data.prueba === true) {
                 this.authService.notificacionesCrear(canal, 2, this.id!).subscribe(
                   (response: any) => {
                     console.error(response);
                   },
                   (error) => {
                     console.error(error);
                   }
                 );
              }
            },
            (error) => {
              console.log(error);
            }
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.totalSuscriptores(this.canal.id);
  }

  comprobar_suscripcion(){
    if(this.id != null){
      this.authService.comprobar_subs(this.id,this.canal.id).subscribe(
        (data)=>{
          this.subs = data.prueba;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  eliminarVideo(Id: number): void{
    this.authService.eliminarVideo(Id).subscribe(
      (response) => {
        console.log("video borrado", response)
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  totalSuscriptores(id_canal: number){
    if(this.usuario && this.privacidadUsuarioId && !this.privacidadUsuarioId.is_publico){
      this.numSuscriptores = 0;
    } else {
      this.authService.subsTotalesPerfil(id_canal).subscribe(
        (response)=>{
          // console.log(response);
          this.substotales=response;
        }
      );
    }
  }





}
