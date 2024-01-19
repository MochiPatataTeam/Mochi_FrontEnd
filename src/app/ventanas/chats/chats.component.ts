import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Persona } from 'src/app/componentes/Interfaces/Persona';
import { Chat } from 'src/app/componentes/Interfaces/Chat';
import { Mensajes } from 'src/app/componentes/Interfaces/Mensajes';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsComponent {
  persona: Persona = {
    1: {
      id: 1,
      nombre: 'Manuel',
      img: 'https://bootdey.com/img/Content/avatar/avatar2.png',
    },
    2: {
      id: 2,
      nombre: 'Federico',
      img: 'https://bootdey.com/img/Content/avatar/avatar6.png',
    },
    3: {
      id: 3,
      nombre: 'Federicaa',
      img: 'https://bootdey.com/img/Content/avatar/avatar8.png',
    },
  };

  chat: Chat = {
    1: { id: 1, id_emisor: 1, id_receptor: 2 },
    2: { id: 2, id_emisor: 2, id_receptor: 1 },
    3: { id: 3, id_emisor: 1, id_receptor: 3 },
    4: { id: 4, id_emisor: 3, id_receptor: 1 },
  };

  mensajes: Mensajes = {
    1: {
      id: 1,
      mensaje: 'Hola..',
      id_chatE: 1,
      id_chatR: 2,
      fecha: '10-15-2024',
      id_usuario: 1,
    },
    2: {
      id: 2,
      mensaje: 'Holiiiiiiiiiiiiiiiiiiiiiii',
      id_chatE: 2,
      id_chatR: 1,
      fecha: '13-15-2024',
      id_usuario: 2,
    },
    3: {
      id: 3,
      mensaje: '¿Qué tal?',
      id_chatE: 1,
      id_chatR: 2,
      fecha: '19-15-2024',
      id_usuario: 1,
    },
    4: {
      id: 4,
      mensaje: 'Deseando irme a mi casa',
      id_chatE: 2,
      id_chatR: 1,
      fecha: '13-15-2024',
      id_usuario: 2,
    },
    5: {
      id: 5,
      mensaje: 'y tu?',
      id_chatE: 2,
      id_chatR: 1,
      fecha: '13-15-2024',
      id_usuario: 2,
    },
    6: {
      id: 6,
      mensaje: 'Igual xd',
      id_chatE: 1,
      id_chatR: 2,
      fecha: '19-15-2024',
      id_usuario: 1,
    },
    7: {
      id: 7,
      mensaje: 'Quedamos mañana por lo de ayer?',
      id_chatE: 1,
      id_chatR: 2,
      fecha: '19-15-2024',
      id_usuario: 1,
    },
    8: {
      id: 8,
      mensaje: 'En el bar de la esquina de mi casa?',
      id_chatE: 1,
      id_chatR: 2,
      fecha: '19-15-2024',
      id_usuario: 1,
    },
    9: {
      id: 9,
      mensaje: 'Hola..',
      id_chatE: 2,
      id_chatR: 1,
      fecha: '10-15-2024',
      id_usuario: 2,
    },
    10: {
      id: 10,
      mensaje: 'Hola..',
      id_chatE: 3,
      id_chatR: 4,
      fecha: '10-15-2024',
      id_usuario: 1,
    },
    11: {
      id: 11,
      mensaje: 'Holiiiiiiiiii',
      id_chatE: 4,
      id_chatR: 3,
      fecha: '10-15-2024',
      id_usuario: 3,
    },
  };

  idChatBuscado!: number;
  mensajesDelChat!: any[];
  idPersona: number = 2;
  nuevoMensaje: string = '';

  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.mensajesDelChat = this.obtenerMensajesPorChat(this.idChatBuscado);
    this.cdr.detectChanges();
  }
  ngAfterViewInit() {
    this.mensajesDelChat = this.obtenerMensajesPorChat(this.idChatBuscado);
    this.cdr.detectChanges();
  }
  obtenerMensajesPorChat(idChat: number) {
    return Object.values(this.mensajes).filter(
      (mensaje) => mensaje.id_chatE == idChat
    );
  }
  obtenerMensajesRPorChat(idChat: number) {
    return Object.values(this.mensajes).filter(
      (mensaje) => mensaje.id_chatR == idChat
    );
  }

  obtenerNombreUsuario(idUsuario: number) {
    const usuario = this.persona[idUsuario];
    return usuario ? usuario.nombre : 'Usuario Desconocido';
  }
  obtenerUsuario(id: number) {
    this.idChatBuscado = id;
    console.log('aaaaaaaaaaaaa', this.idChatBuscado);
    this.mensajesDelChat = this.obtenerMensajesPorChat(this.idChatBuscado);
    this.cdr.detectChanges();
  }

  obtenerContactos(idEmisor: number): any[] {
    let mensajesReceptor = this.obtenerMensajesRPorChat(this.idChatBuscado);

    mensajesReceptor = mensajesReceptor.filter(
      (mensajeR) =>
        !this.mensajesDelChat.some((mensaje) => mensaje.id === mensajeR.id)
    );

    this.mensajesDelChat = this.mensajesDelChat.concat(mensajesReceptor);

    this.mensajesDelChat.sort((a, b) => a.id - b.id);
    console.log(this.mensajesDelChat);

    return Object.values(this.chat).filter(
      (chat) => chat.id_emisor === idEmisor
    );
  }
  enviarMensaje(nuevoMensaje: string) {
    //este metodo esta aun en proceso se va a cambiar
    const nuevoId = Object.keys(this.mensajes).length + 1;

    const nuevoMensajeObj = {
      id: nuevoId,
      mensaje: nuevoMensaje,
      id_chatE: this.idPersona,
      id_chatR: this.idChatBuscado,
      fecha: new Date().toLocaleDateString(),
      id_usuario: this.idPersona,
    };

    this.mensajes[nuevoId] = nuevoMensajeObj;

    this.mensajesDelChat = this.obtenerMensajesPorChat(this.idChatBuscado);
    this.nuevoMensaje = '';
  }
}
