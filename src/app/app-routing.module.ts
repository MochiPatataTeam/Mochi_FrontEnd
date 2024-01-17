import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentanaInicioComponent} from "./ventanas/ventana-inicio/ventana-inicio.component";
import {VentanaReproduccionComponent} from "./ventanas/ventana-reproduccion/ventana-reproduccion.component";

const routes: Routes = [
  {path: '', redirectTo: '/Inicio',pathMatch: 'full'},
  {path: 'Inicio', component: VentanaInicioComponent},
  {path: 'reproducir', component: VentanaReproduccionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
