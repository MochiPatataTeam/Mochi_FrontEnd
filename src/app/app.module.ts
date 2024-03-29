import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

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
import { ModalChangeWallpaperComponent } from './componentes/modal-change-wallpaper/modal-change-wallpaper.component';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { ResetPasswordComponent } from './componentes/reset-password/reset-password.component';
import { VentanaNewPasswordComponent } from './ventanas/ventana-new-password/ventana-new-password.component';
import { BotonComponent } from './componentes/boton/boton.component';
import { VentanaVerifiedComponent } from './ventanas/ventana-verified/ventana-verified.component';
import { VentanaErrorComponent } from './ventanas/ventana-error/ventana-error.component';
import { CampanitaComponent } from './componentes/campanita/campanita.component';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { VideoSuscripcionesComponent } from './componentes/video-suscripciones/video-suscripciones.component';
import { VentanaBuscadorComponent } from './ventanas/ventana-buscador/ventana-buscador.component';
import { VentanaEditarPerfilComponent } from './ventanas/ventana-editar-perfil/ventana-editar-perfil.component';
import { VideosPopularesComponent } from './componentes/videos-populares/videos-populares.component';
import { VentanaEditarVideoComponent } from './ventanas/ventana-editar-video/ventana-editar-video.component';
import { VentanaSubirVideoComponent } from './ventanas/ventana-subir-video/ventana-subir-video.component';
import { VideosTematicaComponent } from './componentes/videos-tematica/videos-tematica.component';

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
    ModalChangeWallpaperComponent,
    ResetPasswordComponent,
    VentanaNewPasswordComponent,
    BotonComponent,
    VentanaVerifiedComponent,
    VentanaErrorComponent,
    CampanitaComponent,
    VideoSuscripcionesComponent,
    VentanaEditarPerfilComponent,
    VentanaBuscadorComponent,
    VideosPopularesComponent,
    VentanaEditarVideoComponent,
    VentanaSubirVideoComponent,
    VideosTematicaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
