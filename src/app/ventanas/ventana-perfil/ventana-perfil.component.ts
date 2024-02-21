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

  usuarioLogueadoCanal = localStorage.getItem('nombre_canal');
  usuarioLogueadoId = JSON.parse(localStorage.getItem('Id')!);
  canal_url = this.route.snapshot.paramMap.get('nombreCanal') ?? '';
  
  usuario: any; //usuario logueado
  canal: any; //perfil al que se accede desde un video
  canalLogueado!: string | null;
  videos: any;

  fechaFormateada!: string;
  mensaje: string = '';
  botonHabilitado: boolean = false;
  id!: number | null;
  

  constructor(private authService: AuthService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router) {}

  onWallpaperChanged(event: string): void {
    this.wallpaperDefault = event;
  }

  ngOnInit(): void {
    this.canalLogueado = this.authService.getStoredCanal() || 'no funsiona. Chipi chipi chapa chapa dubidubi dabadaba';
    this.id = this.authService.getStoredIdUsuario() || 0;

    if (this.canal_url && this.canal_url !== this.usuarioLogueadoCanal) { //si el nombre del canal de la url es nulo o es diferente del nombre canal del usuario logueado
      this.cargarDatosByCanal(this.canal_url);
    } else {
      this.cargarDatosById(this.usuarioLogueadoId);
    }
  }

  cargarDatosByCanal(canal: string): void{
    this.authService.getUsuariobyCanal(canal).subscribe(
      (data) => {
        this.canal = data;
        this.authService.getVideosByNombreCanal(canal).subscribe(
          (video) => {
            console.log(video); //quitar
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
        this.cargarVideosById(userId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cargarVideosById(userId: number): void{
    this.authService.getVideosByIDCanal(userId).subscribe(
      (video) => {
        console.log(video);
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
      // Asegúrate de que 'url' sea una propiedad válida de tu objeto de video
      vi.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vi.url);
    }
  }

  videoDetails(id: number) {
    this.router.navigate(['reproducir', id]);
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

    console.log(mensaje);

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
}
