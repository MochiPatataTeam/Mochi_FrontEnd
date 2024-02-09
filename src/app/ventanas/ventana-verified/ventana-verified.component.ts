import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ventana-verified',
  templateUrl: './ventana-verified.component.html',
  styleUrls: ['./ventana-verified.component.css']
})
export class VentanaVerifiedComponent implements OnInit{

  customButtonText: string = 'Ir a inicio';

  constructor(private route: ActivatedRoute, private authService: AuthService){}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {  //Obtengo los datos de la url para poder pasarselos al back
      const userId = params['id'];
      const expires = params['expires'];
      const signature = params['signature'];
      const token = params['token'];

      const queryParams = { //los pongo todos en una variable
        id: userId,
        expires: expires,
        signature: signature,
        token: token
      };

      this.authService.verifyEmail(queryParams).subscribe(response => {
        console.log(response);
        if(response['message'] === 'Cuenta verificado'){
          console.log('No se, igual no entra por aqui jaja');
        } else {
          console.log('Cuenta verificada correctamente');
        }
      });
    });
  }

}
