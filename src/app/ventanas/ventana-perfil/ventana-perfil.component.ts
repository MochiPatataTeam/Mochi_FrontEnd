import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ventana-perfil',
  templateUrl: './ventana-perfil.component.html',
  styleUrls: ['./ventana-perfil.component.css']
})
export class VentanaPerfilComponent implements OnInit{

  wallpaperDefault: string = `url('../../../assets/imagenes/wallpaper_Mochi/Mochi.jpg')`;

  usuario: any; //usuario logueado
  canal: any; //perfil al que se accede desde un video
  canalLogueado!: string | null;
  videos: any;

  constructor(private authService: AuthService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  onWallpaperChanged(event: string): void {
    this.wallpaperDefault = event;
  }

  ngOnInit(): void {
    if (!this.canalLogueado == null) { //con esto estoy seteando el nombre_canal al localStorage
      this.canalLogueado = 'no funsiona. Chipi chipi chapa chapa dubidubi dabadaba ';
    } else {
      this.canalLogueado = this.authService.getStoredCanal();
    }

    const usuarioLogueadoCanal = localStorage.getItem('nombre_canal');
    const usuarioLogueadoId = JSON.parse(localStorage.getItem('Id')!);
    const canal_url = this.route.snapshot.paramMap.get('nombreCanal') ?? '';

    if (canal_url && canal_url !== usuarioLogueadoCanal) { //si el nombre del canal de la url es nulo o es diferente del nombre canal del usuario logueado
      this.authService.getUsuariobyCanal(canal_url).subscribe(
        (data) => {
          this.canal = data;
        }
      )
    } else {
      this.authService.getUsuariobyId(usuarioLogueadoId).subscribe(
        (response) => {
          console.log(response);
          this.usuario = response;

          this.authService.getVideosByIDCanal(usuarioLogueadoId).subscribe(
            (video) => {
              console.log(video);
              this.videos = Object.values(video);
              this.sanitizarUrls();
            }
          )

        },
        (error) => {
          console.log(error)
        }
      )
    }


  }


  sanitizarUrls() {
    for (const vi of this.videos) {
      // Asegúrate de que 'url' sea una propiedad válida de tu objeto de video
      vi.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vi.url);
    }
  }





}
