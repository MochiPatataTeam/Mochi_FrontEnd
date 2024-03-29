import {Component, Input} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-videos-populares',
  templateUrl: './videos-populares.component.html',
  styleUrls: ['./videos-populares.component.css']
})
export class VideosPopularesComponent {
  @Input() limitarVideos2: boolean = false;
  videos: any[]=[];

  usuarioLogueadoCanal = localStorage.getItem('nombre_canal');
  canalLogueado!: string | null;


  constructor(
    private authservice: AuthService,
    private sanitizer: DomSanitizer,
    private router: Router,

  ){
}

  ngOnInit(): void{
    this.authservice.listVideosPopulares().subscribe(
      (response:any)=>{
        this.videos=response;
        this.sanitizarUrls();
      },
      (error:any)=>{
        console.error('No consigo los videos', error);
      }
    )
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
