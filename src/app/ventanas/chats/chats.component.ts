import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  TemplateRef,
  ElementRef,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { NgIfContext } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsComponent implements OnInit, AfterViewChecked {
  mensajes: any;
  @ViewChild('chatContainer') private chatContainer: ElementRef | undefined;

  constructor(
    private authservice: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  id!: number | null;
  mensajesConver: any[] = [];
  contactos: any[] = [];
  contactos$!: Observable<any[]>;
  nuevoMensaje: string = '';
  chatSeleccionado: any = null;
  mensajes$!: Observable<any[]>;
  loading!: TemplateRef<NgIfContext<any>> | null;
  mensajesJuntos: any[] = [];
  fechaFormateada!: string;
  idPersona!: number;
  nombreIdPersona!: string;
  estadosBotones: { [key: string]: boolean } = {};
  mensajeActualColor = 'even';
  colorSelf = 'chartreuse';
  colorOther = '#c1cbcd';

  toggleEtiqueta(id: number) {
    Object.keys(this.estadosBotones).forEach((key) => {
      this.estadosBotones[key] = false;
    });
    this.estadosBotones[id] = true;
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    }
  }

  ngOnInit(): void {
    if (!this.id == null) {
      this.id = 0;
    } else {
      this.id = this.authservice.getStoredIdUsuario();
    }

    if (this.id != null) {
      this.contactos$ = this.authservice.contactos(this.id);
      this.contactos$.subscribe(
        (contactResponse) => {
          this.contactos = contactResponse;
        },
        (error) => {
          console.log('Error fetching contacts:', error);
        }
      );
    }

    this.cdr.detectChanges();
  }

  mensajesChat(idPersona: number, nombre: string) {
    this.toggleEtiqueta(idPersona);
    this.nombreIdPersona = nombre;
    this.idPersona = idPersona;
    this.ngAfterViewChecked();

    if (this.id != null) {
      this.mensajes$ = this.authservice.mensajes(this.id, idPersona);
      this.mensajes$.subscribe(
        (response) => {
          this.mensajesConver = response;
          this.chatSeleccionado = 1;
          this.imprimirMensajesPorEmisor(this.mensajesConver);
          this.nombreIdPersona = nombre;
          console.log("vvvvvvvvvvvvvvvvvvv",this.mensajesConver)
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  imprimirMensajesPorEmisor(mensajesConver: any[]) {
    const mensajesEmisor: any[] = [];
    const mensajesReceptor: any[] = [];
  
    mensajesConver.forEach((mensaje) => {
      if (mensaje.idEmisor === this.id?.toString()) {
        mensaje.emisor = true;
        mensajesEmisor.push(mensaje);
      } else {
        mensaje.emisor = false;
        mensajesReceptor.push(mensaje);
      }
    });
  
    const mensajesUnidos = [...mensajesEmisor, ...mensajesReceptor];
  
    mensajesUnidos.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  
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

    if (this.id != null) {
      this.authservice
        .enviarMensaje(mensaje, this.fechaFormateada, this.id, idPersona)
        .subscribe(
          (response) => {
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
}
