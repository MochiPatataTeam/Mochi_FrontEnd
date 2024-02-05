import {Component, ElementRef, ViewChild} from '@angular/core';
import { AuthService} from "../../services/auth.service";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventana-inicio',
  templateUrl: './ventana-inicio.component.html',
  styleUrls: ['./ventana-inicio.component.css']
})
export class VentanaInicioComponent {

  patata: any[]=[];
  video: any[]=[];
  id!: number;

  constructor(private authservice:AuthService, private sanitizer: DomSanitizer, private router: Router){
  }
  ngOnInit():void{

    this.authservice.getIdPersona().subscribe(
      (response: any) => {
        if (
          Array.isArray(response) &&
          response.length > 0 &&
          response[0].hasOwnProperty('id')
        ) {
          this.id = response[0].id;
          this.authservice.setAuthId(this.id);

        } else {
          console.error(
            'Invalid or empty response from getIdPersona:',
            response
          );
        }
      },
      (error) => {
        console.error('Error fetching ID:', error);
      }
    );


    this.authservice.usuario().subscribe(
      (response)=>{
        console.log(response)
        this.patata=response;
      },

(error)=>{console.log(error)}
    )

    this.authservice.video().subscribe(
      (response)=>{
        this.video=response;
        this.sanitizarUrls();
      },

      (error)=>{console.log(error)}
    )

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

  videoDetails(id: number){
    this.router.navigate(['reproducir', id]);
  }

}
