import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {BotonSidebarService} from "../../services/boton-sidebar.service";


@Component({
  selector: 'app-ventana-inicio',
  templateUrl: './ventana-inicio.component.html',
  styleUrls: ['./ventana-inicio.component.css'],
})
export class VentanaInicioComponent {
  patata: any[] = [];
  video: any[] = [];
  id: number | null;
  nombreCanal: string;
  valoracion: any[] = [];

  usuarioLogueadoCanal = localStorage.getItem('nombre_canal');
  canalLogueado!: string | null;

  constructor(
    private authservice: AuthService,
    private sanitizer: DomSanitizer,
    private router: Router,
    public botonsidebarservice: BotonSidebarService
  ) {}

  ngOnInit(): void {
    this.canalLogueado = this.authservice.getStoredCanal() || 'no hay. Chipi chipi chapa chapa dubidubi dabadaba';

    this.authservice.reloadRequired$.subscribe(reload => {
      if (reload) {
        window.location.reload(); // Recarga la página
      }
    });

    const idFromService = this.authservice.getId();
    const nombreCanalFromService = this.authservice.getNombreCanal();

    if (idFromService !== null) {
      this.id = idFromService;
      this.authservice.setAuthId(this.id);
    } else {
      console.error('ID is null');
    }

    if (nombreCanalFromService !== null) {
      this.nombreCanal = nombreCanalFromService;
      this.authservice.setAuthCanal(this.nombreCanal);
    } else {
      console.error('No hay canal');
    }

    this.authservice.video().subscribe(
      (response) => {
        this.video = response;
        this.sanitizarUrls();
      },

      (error) => {
        console.log(error);
      }
    );
  }

  sanitizarUrls() {
    for (const vi of this.video) {
      // Asegúrate de que 'url' sea una propiedad válida de tu objeto de video
      vi.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vi.url);
    }
  }



  videoDetails(id: number) {
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
