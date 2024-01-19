import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VentanaInicioComponent } from './ventanas/ventana-inicio/ventana-inicio.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { RegistroComponent } from './ventanas/registro/registro.component';
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { ChatsComponent } from './ventanas/chats/chats.component';

@NgModule({
  declarations: [
    AppComponent,
    VentanaInicioComponent,
    NavbarComponent,
    RegistroComponent,
    SpinnerComponent,
    ChatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
