import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { NgIfContext } from '@angular/common';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsComponent implements OnInit {
  mensajes: any;

  constructor(private authservice: AuthService) {}

  id: number = 1;
  mensajesConver: any[] = [];
  contactos: any[] = [];
  contactos$ = this.authservice.contactos(this.id);
  nuevoMensaje: string = '';
  chatSeleccionado: any = null;
  mensajes$!: Observable<any[]>;
  loading!: TemplateRef<NgIfContext<any>> | null;
  mensajesJuntos: any[] = [];
  fechaFormateada!: string;
  idPersona!: number;
  nombreIdPersona!: string;
  ngOnInit(): void {
    this.authservice.contactos(this.id).subscribe(
      (response) => {
        console.log('aaaaaaaaa', response);
        this.contactos = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  mensajesChat(idPersona: number, nombre: string) {
    this.nombreIdPersona = nombre;
    this.idPersona = idPersona;

    console.log('aaaaaaaaaaaaaaaaaaaaaaaaa', this.idPersona);
    this.mensajes$ = this.authservice.mensajes(this.id, idPersona);
    this.mensajes$.subscribe(
      (response) => {
        this.mensajesConver = response;
        this.chatSeleccionado = 1;
        this.imprimirMensajesPorEmisor(this.mensajesConver);
        this.nombreIdPersona = nombre;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  imprimirMensajesPorEmisor(mensajesConver: any[]) {
    const mensajesEmisor: any[] = [];
    const mensajesReceptor: any[] = [];

    mensajesConver.forEach((mensaje) => {
      if (mensaje.idEmisor === this.id.toString()) {
        mensaje.emisor = true;
        mensajesEmisor.push(mensaje);
      } else {
        mensaje.emisor = false;
        mensajesReceptor.push(mensaje);
      }
    });

    const mensajesUnidos = [...mensajesEmisor, ...mensajesReceptor];

    mensajesUnidos.sort((a, b) => a.id - b.id);

    console.log('Mensajes', mensajesUnidos);
    this.mensajesJuntos = mensajesUnidos;
  }
  enviarMensaje(mensaje: string, idPersona: number) {
    const fechaActual = new Date();
    this.fechaFormateada = `${fechaActual
      .getDate()
      .toString()
      .padStart(2, '0')}/${(fechaActual.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${fechaActual.getFullYear()}`;

    console.log(mensaje);
    this.authservice
      .enviarMensaje(mensaje, this.fechaFormateada, this.id, idPersona)
      .subscribe(
        (response) => {
          console.log('aaaaaaaaa', response);
          this.contactos = response;
        },
        (error) => {
          console.log(error);
        }
      );

    this.mensajesChat(idPersona, this.nombreIdPersona);
    this.nuevoMensaje = '';
  }
}
