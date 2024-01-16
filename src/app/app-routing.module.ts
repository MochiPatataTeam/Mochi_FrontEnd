import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentanaInicioComponent} from "./ventanas/ventana-inicio/ventana-inicio.component";

const routes: Routes = [
  {path: '', redirectTo: '/Inicio',pathMatch: 'full'},
  {path: 'Inicio', component: VentanaInicioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
