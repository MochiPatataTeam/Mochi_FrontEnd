// VentanaReproduccionComponent.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-ventana-reproduccion',
  templateUrl: './ventana-reproduccion.component.html',
  styleUrls: ['./ventana-reproduccion.component.css']
})
export class VentanaReproduccionComponent implements OnInit {
  id: number = 1;
  id_usuario!: number | null;
  comentarioId!: number;
  videoId: any = {};
  videopatata: { url?: SafeResourceUrl } = {};
  nuevoComentario!: string;

  constructor(private authservice: AuthService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.videoId = {};
  }

  ngOnInit(): void {
    if (!this.id_usuario == null) {
      this.id_usuario = 0;
    } else {
      this.id_usuario = this.authservice.getStoredIdUsuario();
    }
    this.id = this.route.snapshot.params['id'];
    this.authservice.videoid(this.id).subscribe(
      (response) => {
        console.log(response);
        this.videoId = response;
        this.sanitizarUrls();
      },
      (error) => {
        console.log(error);
      }
    );
    this.authservice.videoid(this.id).subscribe(
      (response) => {
        this.videoId = response;
        if (response.comentarioDTO && response.comentarioDTO.length > 0) {
          this.comentarioId = response.comentarioDTO[0].id;
        }
        this.sanitizarUrls();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sanitizarUrls() {
    if (this.videoId.url) {
      this.videopatata.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoId.url);
    }
  }

  crearComentario(comentario:string) {
    console.log("Patata",this.id_usuario);
    console.log("Patata",this.videoId.id);
    console.log("Patata",comentario);
    if (this.id_usuario !== null) {
      this.authservice.crearComentario(
        this.id_usuario,
        this.videoId,
        comentario
      ).subscribe(
        (response) => {
          console.log('Comentario creado:', response);
        },
        (error) => {
          console.error('Error al crear el comentario:', error);
        }
      );
    } else {
      console.error('ID de usuario es nulo. No se puede crear el comentario.');
    }

  }


  crearRespuesta(mensaje:string) {
    console.log("Id usuario",this.id_usuario);
    console.log("Id comentario",this.comentarioId);
    console.log(typeof this.comentarioId)
    console.log("Mensaje",mensaje);
    if (this.id_usuario !== null) {
      this.authservice.crearRespuesta(
        this.id_usuario,
        this.comentarioId,
        mensaje
      ).subscribe(
        (response) => {
          console.log('Respuesta creada:', response);
        },
        (error) => {
          console.error('Error al crear la respuesta:', error);
        }
      );
    } else {
      console.error('ID de usuario es nulo. No se puede crear el comentario.');
    }

  }


  // Función para mostrar la caja de respuesta
  mostrarRespuesta(comentario: any) {
    comentario.mostrarCajaRespuesta = !comentario.mostrarCajaRespuesta;
    comentario.nuevaRespuesta = ''; // Limpiar el campo de texto de respuesta
  }
}
