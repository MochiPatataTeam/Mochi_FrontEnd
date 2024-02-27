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

      isPublico: [this.privacidadUsuario.isPublico],
      permitirSuscripciones: [this.privacidadUsuario.permitirSuscripciones],
      permitirDescargar: [this.privacidadUsuario.permitirDescargar],
    });
  }



  onSubmit(): void{
    const formData = this.usuarioForm.getRawValue(); // Obtener solo los valores del formulario

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
