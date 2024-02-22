import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-ventana-buscador',
  templateUrl: './ventana-buscador.component.html',
  styleUrls: ['./ventana-buscador.component.css'],
})
export class VentanaBuscadorComponent {
  id!: number | null;
  dato: string = '';
  videos: any[] = [];
  canales: any[] = [];
  seccionElegida: 'videos' | 'canales' | null = null;

  constructor(
    private route: ActivatedRoute,
    private authservice: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    //----------------------------------------------------

    //---------------------------------------------------
    this.actualizarDatos();
    this.recuperarSeccionElegida();
    if (this.seccionElegida == 'videos') {
      this.buscarTitulos();
    }
    if (this.seccionElegida == 'canales') {
      this.buscarCanales();
    }
  }

  actualizarDatos() {
    this.route.queryParams.subscribe((params) => {
      const nuevoDato = params['dato'] || '';

      if (this.dato !== nuevoDato) {
        // El valor de 'dato' ha cambiado, actualizamos el valor
        this.dato = nuevoDato;
        console.log('fefefefe', this.dato);
      } else {
        // El valor de 'dato' no ha cambiado
        console.log('El valor de dato no ha cambiado:', this.dato);
      }
    });
  }

  buscarTitulos() {
    this.authservice.buscarTitulo(this.dato).subscribe(
      (response) => {
        console.log('Buscar títulos:', response);
        this.videos = response;
        this.actualizarSeccionElegida('videos');
        this.sanitizarUrls();
      },
      (error) => {
        console.log('Error fetching titles:', error);
      }
    );
  }

  buscarCanales() {
    this.authservice.buscarCanales(this.dato).subscribe(
      (response) => {
        console.log('Buscar canales:', response);
        this.canales = response;
        this.actualizarSeccionElegida('canales');
      },
      (error) => {
        console.log('Error fetching channels:', error);
      }
    );
  }

  actualizarSeccionElegida(seccion: 'videos' | 'canales') {
    this.seccionElegida = seccion;
    localStorage.setItem('seccionElegida', seccion);
  }

  recuperarSeccionElegida() {
    const seccionGuardada = localStorage.getItem('seccionElegida');
    this.seccionElegida = seccionGuardada
      ? (seccionGuardada as 'videos' | 'canales')
      : 'videos';
  }

  videoDetails(id: number) {
    this.router.navigate(['reproducir', id]);
  }

  sanitizarUrls() {
    for (const vi of this.videos) {
      // Asegúrate de que 'url' sea una propiedad válida de tu objeto de video
      vi.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vi.url);
    }
  }
  //  ------------------------------------------------------------------
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
