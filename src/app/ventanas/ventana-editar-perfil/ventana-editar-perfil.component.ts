import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ventana-editar-perfil',
  templateUrl: './ventana-editar-perfil.component.html',
  styleUrls: ['./ventana-editar-perfil.component.css']
})
export class VentanaEditarPerfilComponent implements OnInit{

  id: number;
  usuario: any;
  privacidadUsuario: any;
  usuarioForm: FormGroup;
  isPublicoInicial: boolean | null = null;
  subs: any;

  customButtonText: string = 'Guardar cambios';


  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder){}


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.authService.getUsuariobyId(this.id).subscribe(
      (usuario: any) => {
        this.usuario = usuario;

        this.authService.getPrivByUsuariId(this.id).subscribe(
          (privacidadUsuario : any) => {
            this.privacidadUsuario = privacidadUsuario;
            this.iniciarForm();
          }
        )
      },
      (error) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    )
  }


  iniciarForm(): void{
    this.usuarioForm = this.formBuilder.group({
      nombre: [this.usuario.nombre],
      apellidos: [this.usuario.apellidos],
      username: [this.usuario.username],
      email: [this.usuario.email],
      telefono: [this.usuario.telefono],
      nombre_canal: [this.usuario.nombreCanal],
      descripcion: [this.usuario.descripcion],
      imagen: [this.usuario.imagen],

      isPublico: [this.privacidadUsuario.isPublico],
      permitirSuscripciones: [this.privacidadUsuario.permitirSuscripciones],
      permitirDescargar: [this.privacidadUsuario.permitirDescargar],
      
    });
    const isPublicoControl = this.usuarioForm.get('isPublico');
  if (isPublicoControl) {
    this.isPublicoInicial = isPublicoControl.value;
  } else {
    console.error('Error al obtener el valor inicial de isPublico');
  }
  }



  onSubmit(): void{
    const formData = this.usuarioForm.getRawValue(); // Obtener solo los valores del formulario

    if (this.isPublicoInicial !== null && this.isPublicoInicial && formData.isPublico !== this.isPublicoInicial) {
      this.authService.buscarSubs(this.id).subscribe(
        (response: any) => {
          this.subs = response;
          if(this.id != null){
          for (var i = 0; i < this.subs.length; i += 1) {
            console.log("sadfasfasdfasdf",this.subs[i].id)
            this.authService.notificacionesCrear(this.subs[i].id_suscriptor,5,this.id).subscribe(
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

    this.authService.perfilEdit(this.id, formData).subscribe
    (data =>{
      console.log('Usuario actualizado', data);
      this.router.navigate(['/perfil']);
    },
    error => {
      console.error('Error al actualizar usuario', error);
      }
    );
  }

}
