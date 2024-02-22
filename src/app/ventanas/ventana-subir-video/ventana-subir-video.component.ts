import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ventana-subir-video',
  templateUrl: './ventana-subir-video.component.html',
  styleUrls: ['./ventana-subir-video.component.css']
})
export class VentanaSubirVideoComponent implements OnInit{

  titulo: string;
  url: string;
  descripcion: string;
  idTematicas: string= "";

  id!: number | null;
  video: any; 
  videoForm: FormGroup;
  tematicas:any;
  spinner: boolean= false;
  subs: any;

  customButtonText: string = 'Guardar cambios';
  

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder){}


  ngOnInit(): void {
    if (!this.id == null) {
      this.id = 0;
    } else {
      this.id = this.authService.getStoredIdUsuario();
    }
    this.videoForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      url: ['', Validators.required],
      tematica: ['', Validators.required],
      descripcion: [''],
    });
    this.authService.tematicas().subscribe(
         (response: any) => {
           this.tematicas = response;
         }, 
         (error) => {
           console.error('Error al obtener los datos del usuario', error);
        }
       );
  }

  onSubmit(): void{
    console.log(this.titulo,this.url,this.idTematicas,this.descripcion)
    if(this.id!= null){
      this.spinner= true
      this.authService.crearVideo(this.titulo,this.descripcion,this.url,this.id,this.idTematicas).subscribe(
        (response) => {
          console.log("vvvvvvvvvvvvvvvvvvv",response)
          if(this.id != null){

            this.authService.buscarSubs(this.id).subscribe(
              (response: any) => {
                this.subs = response;
                if(this.id != null){
                for (var i = 0; i < this.subs.length; i += 1) {
                  console.log("sadfasfasdfasdf",this.subs[i].id)
                  this.authService.notificacionesCrear(this.subs[i].id_suscriptor,1,this.id).subscribe(
                    (response: any) => {
                      console.error(response);
                    }, 
                    (error) => {
                      console.error(error);
                   }
                  );
                }
              }
              }, 
              (error) => {
                console.error(error);
             }
            );
      
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
    
  }

}


