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
      console.log('no funciona');

    }else{
      this.authservice.listTodoBySuscripcion(this.id_usuario).subscribe(
        (response: any) => {
          // Manejar la respuesta y asignarla a la variable videosSuscripciones
          this.videos = response;
          console.log('hola soy yo mira a ver',response)
          this.sanitizarUrls();
          console.log(this.videos);
        },
        (error: any) => {
          console.error('Error al obtener los videos de suscripciones:', error);
          // Manejar el error si es necesario
        }
      );



    }

  }
  sanitizarUrls() {
    for (const vi of this.videos) {
      // Asegúrate de que 'url' sea una propiedad válida de tu objeto de video
      vi.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vi.url);
    }
  }
  videoDetails2(id: number) {
    this.router.navigate(['reproducir', id]);
  }
}
