import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  ventana: boolean = false;

    constructor(private authService: AuthService){}

    email: string = '';


    onSubmit(): void {
      this.authService.requestPasswordReset(this.email)
        .subscribe(response => {
          console.log('si lo tengo', response);
          this.ventana = true;
        }, error => {
          console.error(':c', error);
        });
    }
}
