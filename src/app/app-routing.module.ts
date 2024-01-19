import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentanaInicioComponent} from "./ventanas/ventana-inicio/ventana-inicio.component";
import { RegistroComponent } from './ventanas/registro/registro.component';
import { ChatsComponent } from './ventanas/chats/chats.component';
import { SpinnerComponent } from './componentes/spinner/spinner.component';

const routes: Routes = [
  {path: '', redirectTo: '/Inicio',pathMatch: 'full'},
  {path: 'Inicio', component: VentanaInicioComponent},
  {path: 'Registro', component: RegistroComponent},
  {path: 'Chats', component: ChatsComponent},
  {path: 'Spinner', component: SpinnerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
