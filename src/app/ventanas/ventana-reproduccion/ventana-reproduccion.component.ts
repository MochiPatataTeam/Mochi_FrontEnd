import { Component } from '@angular/core';
import { AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-ventana-reproduccion',
  templateUrl: './ventana-reproduccion.component.html',
  styleUrls: ['./ventana-reproduccion.component.css']
})
export class VentanaReproduccionComponent {
  comentarios: any[]=[];
  respuestas: any[]=[];

  constructor(private authservice: AuthService) {
  }

  //Listar comentarios
  ngOnInit():void{
    this.authservice.comentario().subscribe(
      (response)=>{
        console.log(response)
        this.comentarios=response;
      },
      (error)=>{console.log(error)}
    )
  }

}
