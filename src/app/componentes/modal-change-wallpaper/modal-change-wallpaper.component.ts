import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-change-wallpaper',
  templateUrl: './modal-change-wallpaper.component.html',
  styleUrls: ['./modal-change-wallpaper.component.css']
})
export class ModalChangeWallpaperComponent {

  opcionesWallpaper: string[]= [
    '../../../assets/imagenes/wallpaper_Mochi/aurora.jpg',
    '../../../assets/imagenes/wallpaper_Mochi/bosque.jpg',
    '../../../assets/imagenes/wallpaper_Mochi/cat.jpg',
    '../../../assets/imagenes/wallpaper_Mochi/cielo_estrellado.jpg',
    '../../../assets/imagenes/wallpaper_Mochi/city.jpg',
    '../../../assets/imagenes/wallpaper_Mochi/nutrias.jpg',
    '../../../assets/imagenes/wallpaper_Mochi/sakura.jpg',
    '../../../assets/imagenes/wallpaper_Mochi/snow.jpg',
    '../../../assets/imagenes/wallpaper_Mochi/Mochi.jpg',
  ];

  @Output() wallpaperChanged: EventEmitter<string> = new EventEmitter<string>();

  // wallpaperDefault: string = '';

   cambiarWallpaper(ruta: string): void{
    const wallpaperRuta = `../../../assets/imagenes/wallpaper_Mochi/${ruta}`;
    this.wallpaperChanged.emit(`url('${wallpaperRuta}')`);
   }


}
