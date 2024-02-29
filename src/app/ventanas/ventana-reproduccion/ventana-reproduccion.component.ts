// VentanaReproduccionComponent.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-ventana-reproduccion',
  templateUrl: './ventana-reproduccion.component.html',
  styleUrls: ['./ventana-reproduccion.component.css']
})
export class VentanaReproduccionComponent implements OnInit {
  id: number = 1;
  id_usuario!: number | null;
  nombre_canal: string;
  comentarioId!: number;
  videoId: any = {}; //video DATA general
  videopatata: { url?: SafeResourceUrl } = {};
  //videopatata1: { url: SafeResourceUrl }[] = [];
  nuevoComentario!: string;
  customButtonText: string = 'Enviar comentario';
  idUsuarioSubidaVideo: number | undefined;
  activo : boolean=false;
  canal: any; //Para cargar el perfil
  tematica: string;
  videosug: any []=[];
  mostrarTituloCompleto: boolean = false;
  longitudMaximaTitulo: number = 15;


  constructor(private authservice: AuthService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private router: Router) {
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
        console.log("achuuuuu",response);
        this.videoId = response;
        this.nombre_canal=response.canal;
        this.tematica= this.videoId.tematica;
        console.log('asdfjkasdfjkljklasdf', this.tematica);
        if (this.id_usuario != null) {
        this.authservice.listSusyTematica(this.id_usuario!,this.tematica).subscribe(
          (data)=>{
            // Verificar si data es un array y tiene al menos un elemento
            if (Array.isArray(data) && data.length > 0) {
              // Filtrar los videos sugeridos para excluir el video que se está reproduciendo
              this.videosug = data.filter((video: any) => video.id !== this.videoId.id);
              console.log('LEEME A MI', this.videosug);
              this.sanitizarUrls1();
            } else {
              console.log('No se han encontrado datos de video.');



          }}
        )}
        this.sanitizarUrls();
      },
      (error) => {
        console.log(error);
      }
    );
    //borra hasta aqui
    this.authservice.videoid(this.id).subscribe(
      (response) => {
        this.videoId = response;
        if (response.comentarioDTO && response.comentarioDTO.length > 0) {
          this.comentarioId = response.comentarioDTO[0].id;
        }
        this.sanitizarUrls();
        // Verificar si el usuario conectado es el propietario del video
        this.authservice.buscarId(this.videoId.id).subscribe(
          (response)=>{
            this.idUsuarioSubidaVideo=response[0].id_canal;
            if (this.id_usuario == this.idUsuarioSubidaVideo) {
              this.activo = true;
            }else{
              this.activo= false;
            }
          },(error)=>{
          }
        )

      },
      (error) => {
        console.log(error);
      }
    ); //Aqui empieza el metodo para cargar el perfil del q subio el video
    this.authservice.videoid(this.id).subscribe(
      (data) => {
        this.videoId = data;
        this.canal = data.canal;
      },
      (error => {
        console.log(error);
      })
    )
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.location.reload();
      }
    });





  }


  sanitizarUrls() {
    if (this.videoId.url) {
      this.videopatata.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoId.url);
    }
  }

  crearComentario(comentario:string,username:string) {
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

          this.authservice.buscarIdCanal(username).subscribe(
            (response: any) => {
              console.error(response);
              if(this.id_usuario != null){
              this.authservice.notificacionesCrear(response[0].id,3,this.id_usuario).subscribe(
                (response: any) => {
                  console.error(response);
                  window.location.reload();
                },
                (error) => {
                  console.error(error);
               }
              );
            }
            },
            (error) => {
              console.error(error);
           }
          );
        },
        (error) => {
          console.error('Error al crear el comentario:', error);
        }
      );
    } else {
      console.error('ID de usuario es nulo. No se puede crear el comentario.');
    }


  }


  crearRespuesta(mensaje: string, comentarioId: number,canal:string) {
    console.log("Id usuario", this.id_usuario);
    console.log("Id comentario", comentarioId);
    console.log("Mensaje", mensaje);

    if (this.id_usuario !== null) {
      this.authservice.crearRespuesta(
        this.id_usuario,
        comentarioId,
        mensaje
      ).subscribe(
        (response) => {
          console.log('Respuesta creada:', response);
          this.authservice.buscarUsername(canal).subscribe(
            (response: any) => {
              console.error(response);
              if(this.id_usuario != null){
              this.authservice.notificacionesCrear(response[0].id,4,this.id_usuario).subscribe(
                (response: any) => {
                  console.error(response);
                  window.location.reload();
                },
                (error) => {
                  console.error(error);
               }
              );
            }
            },
            (error) => {
              console.error(error);
           }
          );
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

  //Funcion para cargar el perfil del usuario que subio el video
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
  sanitizarUrls1() {
    for (const video1 of this.videosug) {
      // Asegúrate de que 'url' sea una propiedad válida de tu objeto de video
      video1.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(video1.url);
    }

}
  videoDetails2(id: number) {
    this.router.navigate(['reproducir', id]);
    console.log('soy el id',this.id);


  }


}
