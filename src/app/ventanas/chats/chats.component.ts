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
  imagenIdPersona!: string;
  estadosBotones: { [key: string]: boolean } = {};
  mensajeActualColor = 'even';
  colorSelf = 'chartreuse';
  colorOther = '#c1cbcd';
  filtroBusqueda: string = '';
  contactosOriginal: any[] = [];
  contactosMostrados: any[] = [];

  realizarBusqueda() {
    if (this.filtroBusqueda.trim() !== '') {
      this.contactosMostrados = this.filtrarContactos();
    } else {
      this.contactosMostrados = this.contactosOriginal;
    }
  }

  filtrarContactos() {
    return this.contactosOriginal.filter((contacto) =>
      contacto.nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase())
    );
  }

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
          this.contactosOriginal = contactResponse;
          this.contactosMostrados = contactResponse;
          this.contactos = contactResponse;
        },
        (error) => {
          console.log('Error fetching contacts:', error);
        }
      );
    }

    this.cdr.detectChanges();
  }

  mensajesChat(idPersona: number, nombre: string, imagen: string) {
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
          this.mensajesJuntos= this.imprimirMensajesPorEmisor(this.mensajesConver);
          this.nombreIdPersona = nombre;
          this.imagenIdPersona = imagen;
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

    mensajesUnidos.sort((a, b) => {
      const fechaA = new Date(a.fecha.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')).getTime();
      const fechaB = new Date(b.fecha.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')).getTime();

      if (fechaA === fechaB) {
        return a.id - b.id;
      }

      return fechaA - fechaB;
    });

    return mensajesUnidos;
  }



  enviarMensaje(mensaje: string, idPersona: number) {
    const fechaActual = new Date();
    this.fechaFormateada = `${fechaActual
      .getDate()
      .toString()
      .padStart(2, '0')}/${(fechaActual.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${fechaActual.getFullYear()}`;

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

      this.mensajesChat(idPersona, this.nombreIdPersona, this.imagenIdPersona);
      this.nuevoMensaje = '';
    }
  }
}
