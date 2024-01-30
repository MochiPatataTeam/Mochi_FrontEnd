import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentanaInicioComponent} from "./ventanas/ventana-inicio/ventana-inicio.component";
import {VentanaReproduccionComponent} from "./ventanas/ventana-reproduccion/ventana-reproduccion.component";
import { VentanaLoginComponent } from './ventanas/ventana-login/ventana-login.component';
import { VentanaPerfilComponent } from './ventanas/ventana-perfil/ventana-perfil.component';
import { RegistroComponent } from './ventanas/registro/registro.component';
import { ChatsComponent } from './ventanas/chats/chats.component';
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { ModalChangeWallpaperComponent } from './componentes/modal-change-wallpaper/modal-change-wallpaper.component';
import { ResetPasswordComponent } from './componentes/reset-password/reset-password.component';
import { VentanaNewPasswordComponent } from './ventanas/ventana-new-password/ventana-new-password.component';

const routes: Routes = [
  {path: '', redirectTo: '/Inicio',pathMatch: 'full'},
  {path: 'Inicio', component: VentanaInicioComponent},
  {path: 'reproducir', component: VentanaReproduccionComponent},
  {path: 'Login', component: VentanaLoginComponent, data: { showNavbar: false }},
  {path: 'perfil', component: VentanaPerfilComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'chats', component: ChatsComponent},
  {path: 'spinner', component: SpinnerComponent},
  {path: 'changeWallpaper', component: ModalChangeWallpaperComponent},
  {path: 'resetPassword', component: ResetPasswordComponent},
  {path: 'newPassword/:token', component: VentanaNewPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
