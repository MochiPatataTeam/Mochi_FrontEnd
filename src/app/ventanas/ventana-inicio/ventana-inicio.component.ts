import {Component, ElementRef, ViewChild} from '@angular/core';
import { AuthService} from "../../services/auth.service";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ventana-inicio',
  templateUrl: './ventana-inicio.component.html',
  styleUrls: ['./ventana-inicio.component.css']
})
export class VentanaInicioComponent {

  patata: any[]=[];
  video: any[]=[];
  constructor(private authservice:AuthService, private sanitizer: DomSanitizer){
  }
  ngOnInit():void{
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

  redirigirAotraPagina() {
    window.location.href = 'http://localhost:4200/reproducir';
  }


}
