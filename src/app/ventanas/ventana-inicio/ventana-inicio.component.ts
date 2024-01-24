import { Component } from '@angular/core';
import { AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-ventana-inicio',
  templateUrl: './ventana-inicio.component.html',
  styleUrls: ['./ventana-inicio.component.css']
})
export class VentanaInicioComponent {

  patata: any[]=[];

  constructor(private authservice:AuthService){

  }
  ngOnInit():void{
    this.authservice.usuario().subscribe(
      (response)=>{
        console.log(response)
        this.patata=response;
      },

(error)=>{console.log(error)}
    )


  }
}
