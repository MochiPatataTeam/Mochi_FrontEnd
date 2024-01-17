import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VentanaInicioComponent } from './ventanas/ventana-inicio/ventana-inicio.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { VentanaReproduccionComponent } from './ventanas/ventana-reproduccion/ventana-reproduccion.component';

@NgModule({
  declarations: [
    AppComponent,
    VentanaInicioComponent,
    NavbarComponent,
    VentanaReproduccionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
