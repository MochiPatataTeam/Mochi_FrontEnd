import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ventana-new-password',
  templateUrl: './ventana-new-password.component.html',
  styleUrls: ['./ventana-new-password.component.css']
})
export class VentanaNewPasswordComponent implements OnInit{

  customButtonText: string = 'Actualizar contraseña';

  constructor(private route: ActivatedRoute,
              private authService: AuthService) {
                this.route.params.subscribe(params => {
                  this.token = params['token'];
                });
              }


  newPassword: string = '';
  token: string = '';


  ngOnInit(): void {
  }


  submitForm(): void{
    this.authService.resetPassword(this.token, this.newPassword).subscribe(
      response => {
        console.log('Contraseña actualizada correctamente', response);
      },
      error => {
        console.error('Error al restablecer la contraseña', error);
      }
    );
  }



}
