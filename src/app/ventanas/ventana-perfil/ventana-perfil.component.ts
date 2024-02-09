import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ventana-perfil',
  templateUrl: './ventana-perfil.component.html',
  styleUrls: ['./ventana-perfil.component.css']
})
export class VentanaPerfilComponent implements OnInit{

  wallpaperDefault: string = `url('../../../assets/imagenes/wallpaper_Mochi/Mochi.jpg')`;
  usuario: any;

  constructor(private authService: AuthService) {}

  onWallpaperChanged(event: string): void {
    this.wallpaperDefault = event;
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('Id')!);
    this.authService.getUsuariobyId(user).subscribe(
      (response) => {
        console.log(response);
        this.usuario = response;
      }, 
      (error) => {
        console.log(error);
      }
    );
  }






}
