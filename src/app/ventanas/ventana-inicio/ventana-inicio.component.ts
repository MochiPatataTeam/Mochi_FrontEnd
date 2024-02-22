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
  id!: number;
  nombreCanal: string;

  constructor(
    private authservice: AuthService,
    private sanitizer: DomSanitizer,
    private router: Router,
    public botonsidebarservice: BotonSidebarService
  ) {}
  ngOnInit(): void {
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

    this.authservice.usuario().subscribe(
      (response) => {
        console.log(response);
        this.patata = response;
      },

      (error) => {
        console.log(error);
      }
    );

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

  redirigirAotraPagina(id: number) {
    window.location.href = `http://localhost:4200/reproducir/${id}`;
  }

  videoDetails(id: number) {
    this.router.navigate(['reproducir', id]);
  }
}
