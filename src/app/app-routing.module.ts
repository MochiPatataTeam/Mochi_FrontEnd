import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentanaInicioComponent} from "./ventanas/ventana-inicio/ventana-inicio.component";
import {VentanaReproduccionComponent} from "./ventanas/ventana-reproduccion/ventana-reproduccion.component";
import { VentanaLoginComponent } from './ventanas/ventana-login/ventana-login.component';
import { VentanaPerfilComponent } from './ventanas/ventana-perfil/ventana-perfil.component';
import { RegistroComponent } from './ventanas/registro/registro.component';
import { ChatsComponent } from './ventanas/chats/chats.component';
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { ResetPasswordComponent } from './componentes/reset-password/reset-password.component';
import { VentanaNewPasswordComponent } from './ventanas/ventana-new-password/ventana-new-password.component';
import { VentanaVerifiedComponent } from './ventanas/ventana-verified/ventana-verified.component';
import { VentanaErrorComponent } from './ventanas/ventana-error/ventana-error.component';
import { VideoSuscripcionesComponent } from './componentes/video-suscripciones/video-suscripciones.component';
import { VentanaEditarPerfilComponent } from './ventanas/ventana-editar-perfil/ventana-editar-perfil.component';
import { VentanaBuscadorComponent } from './ventanas/ventana-buscador/ventana-buscador.component';


const routes: Routes = [
  {path: '', redirectTo: '/Inicio',pathMatch: 'full'},
  {path: 'Inicio', component: VentanaInicioComponent},
  {path: 'reproducir', component: VentanaReproduccionComponent},
  {path: 'reproducir/:id', component: VentanaReproduccionComponent},
  {path: 'Login', component: VentanaLoginComponent, data: { showNavbar: false }},
  {path: 'perfil', component: VentanaPerfilComponent},
  {path: 'perfil/:nombreCanal', component: VentanaPerfilComponent},
  {path: 'Registro', component: RegistroComponent, data: { showNavbar: false }},
  {path: 'chats', component: ChatsComponent},
  {path: 'spinner', component: SpinnerComponent},
  {path: 'newPassword/:token', component: VentanaNewPasswordComponent},
  {path: 'verified', component: VentanaVerifiedComponent},
  {path: 'subsvideos', component: VideoSuscripcionesComponent},
  {path: 'error', component: VentanaErrorComponent},
  {path: 'editarPerfil/:id', component: VentanaEditarPerfilComponent},
  {path: 'buscador', component: VentanaBuscadorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
