import {Component, Input, OnInit,} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
@Component({
  selector: 'app-video-suscripciones',
  templateUrl: './video-suscripciones.component.html',
  styleUrls: ['./video-suscripciones.component.css']
})
export class VideoSuscripcionesComponent implements OnInit {
  @Input() limitarVideos: boolean = false;
  id_usuario!: number | null;
  videos: any[] = [];

  usuarioLogueadoCanal = localStorage.getItem('nombre_canal');
  canalLogueado!: string | null;


  constructor(
    private authservice: AuthService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
  }


  ngOnInit(): void {
    if (!this.id_usuario == null) {
      this.id_usuario = 0;
    } else {
      this.id_usuario = this.authservice.getStoredIdUsuario();
    }
    if(this.id_usuario==null){
      console.log('error');

    }else{
      this.authservice.listTodoBySuscripcion(this.id_usuario).subscribe(
        (response: any) => {
          // Manejar la respuesta y asignarla a la variable videosSuscripciones
          this.videos = response;
          this.sanitizarUrls();
        },
        (error: any) => {
          console.error('Error al obtener los videos de suscripciones:', error);
        }
      );



    }

  }
  sanitizarUrls() {
    for (const vi of this.videos) {
      vi.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vi.url);
    }
  }
  videoDetails2(id: number) {
    this.router.navigate(['reproducir', id]);
  }



  cargarPerfil(canal: string): void{
    this.authservice.getUsuariobyCanal(canal).subscribe(
      (usuario) => {
        if (usuario) {
          this.router.navigate(['/perfil', canal]);
        } else {
          console.error('No existe ese canal')
        }
      },
      (error) => {
        console.error('Error al obtener el usuario por el canal', error);
      }
    );
  }
}
