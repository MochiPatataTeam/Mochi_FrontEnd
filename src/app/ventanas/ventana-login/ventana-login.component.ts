import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ventana-login',
  templateUrl: './ventana-login.component.html',
  styleUrls: ['./ventana-login.component.css']
})
export class VentanaLoginComponent {

  username: string = '';
  password: string = '';

  error: any;

  constructor(private authService: AuthService, private router: Router, private location: Location){}

  customButtonText: string = 'Iniciar sesión';

  login(): void{
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Login exitoso si existe el JWT
        if(response){
          localStorage.setItem('jwt', JSON.stringify(response));
          this.router.navigate(['../Inicio']);
          this.authService.setReloadRequired(true);
          this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (this.router.url === '/Inicio') {
            this.location.replaceState(this.router.url);
            window.location.reload();
          }
        }
      });
        }
      },
      error => {
        console.error('Error en el inicio de sesion', error);
      }
    );
  }
}
