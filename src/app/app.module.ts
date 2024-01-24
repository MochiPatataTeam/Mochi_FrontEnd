import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VentanaInicioComponent } from './ventanas/ventana-inicio/ventana-inicio.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { VentanaReproduccionComponent } from './ventanas/ventana-reproduccion/ventana-reproduccion.component';
import { VentanaLoginComponent } from './ventanas/ventana-login/ventana-login.component';
import { VentanaPerfilComponent } from './ventanas/ventana-perfil/ventana-perfil.component';
import { RegistroComponent } from './ventanas/registro/registro.component';
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { ChatsComponent } from './ventanas/chats/chats.component';

@NgModule({
  declarations: [
    AppComponent,
    VentanaInicioComponent,
    NavbarComponent,
    VentanaReproduccionComponent,
    VentanaLoginComponent,
    VentanaPerfilComponent,
    RegistroComponent,
    SpinnerComponent,
    ChatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
