import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ventana-login',
  templateUrl: './ventana-login.component.html',
  styleUrls: ['./ventana-login.component.css']
})
export class VentanaLoginComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router){}

  login(): void{
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Login exitoso si existe el JWT
        if(response){
          localStorage.setItem('jwt', JSON.stringify(response));
          this.router.navigate(['/Inicio']);
        }
      },
      error => {
        console.error('Error en el inicio de sesion', error);
      }
    );
  }


}
