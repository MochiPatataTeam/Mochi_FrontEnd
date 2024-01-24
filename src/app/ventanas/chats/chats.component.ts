import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit,
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
export class ChatsComponent implements OnInit {
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
    1: {
      id: 1,
      id_usuario: 1,
      id_usuario2: 2,
      arrayMensajes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    2: { id: 2, id_usuario: 1, id_usuario2: 3, arrayMensajes: [10, 11] },
  };

  mensajes: Mensajes = {
    1: {
      id: 1,
      mensaje: 'Hola..',
      fecha: '10-15-2024',
      id_usuario: 1,
    },
    2: {
      id: 2,
      mensaje: 'Holiiiiiiiiiiiiiiiiiiiiiii',
      fecha: '13-15-2024',
      id_usuario: 2,
    },
    3: {
      id: 3,
      mensaje: '¿Qué tal?',
      fecha: '19-15-2024',
      id_usuario: 1,
    },
    4: {
      id: 4,
      mensaje: 'Deseando irme a mi casa',
      fecha: '13-15-2024',
      id_usuario: 2,
    },
    5: {
      id: 5,
      mensaje: 'y tu?',
      fecha: '13-15-2024',
      id_usuario: 2,
    },
    6: {
      id: 6,
      mensaje: 'Igual xd',
      fecha: '19-15-2024',
      id_usuario: 1,
    },
    7: {
      id: 7,
      mensaje: 'Quedamos mañana por lo de ayer?',
      fecha: '19-15-2024',
      id_usuario: 1,
    },
    8: {
      id: 8,
      mensaje: 'En el bar de la esquina de mi casa?',
      fecha: '19-15-2024',
      id_usuario: 1,
    },
    9: {
      id: 9,
      mensaje: 'Hola..',
      fecha: '10-15-2024',
      id_usuario: 2,
    },
    10: {
      id: 10,
      mensaje: 'Hola..',
      fecha: '10-15-2024',
      id_usuario: 1,
    },
    11: {
      id: 11,
      mensaje: 'Holiiiiiiiiii',
      fecha: '10-15-2024',
      id_usuario: 3,
    },
  };

  idChatBuscado!: number;
  idPersona: number = 1;
  chatsRelacionados: any[] = [];
  nuevoMensaje: string = '';
  chatSeleccionado: any = null;

  ngOnInit(): void {
    this.buscarChatsRelacionados();
    //metodo de traer los mensajes de base de datos
  }

  buscarChatsRelacionados() {
    this.chatsRelacionados = this.buscarChatsPorPersona(this.idPersona);
  }

  seleccionarChat(chat: any) {
    this.chatSeleccionado = chat;
  }

  buscarChatsPorPersona(idPersona: number): any[] {
    return Object.values(this.chat)
      .filter(
        (c: any) => c.id_usuario === idPersona || c.id_usuario2 === idPersona
      )
      .map((c: any) => ({
        id: c.id,
        id_usuario: c.id_usuario,
        id_usuario2: c.id_usuario2,
        arrayMensajes: c.arrayMensajes,
      }));
  }

  obtenerNombrePersona(idPersona: number): string {
    return this.persona[idPersona].nombre;
  }

  obtenerNombre(idPersona: number): string {
    return this.obtenerNombrePersona(idPersona);
  }

  enviarMensaje() {
    if (this.nuevoMensaje.trim() === '') {
      return;
    }

    const nuevoMensaje = {
      id: this.generarNuevoIdMensaje(),
      mensaje: this.nuevoMensaje,
      fecha: this.obtenerFechaActual(),
      id_usuario: this.idPersona,
    };

    const chatSeleccionadoOriginal = this.chatSeleccionado;

    chatSeleccionadoOriginal.arrayMensajes.push(nuevoMensaje.id);

    this.mensajes[nuevoMensaje.id] = nuevoMensaje;

    const mensajesChatSeleccionado = chatSeleccionadoOriginal.arrayMensajes.map(
      (mensajeId: number) => this.mensajes[mensajeId]
    );

    console.log('Chat Seleccionado:', chatSeleccionadoOriginal);
    console.log('Mensajes del Chat Seleccionado:', mensajesChatSeleccionado);

    this.chatSeleccionado = chatSeleccionadoOriginal;

    this.datos(
      chatSeleccionadoOriginal.id,
      chatSeleccionadoOriginal.id_usuario,
      chatSeleccionadoOriginal.id_usuario2,
      chatSeleccionadoOriginal.arrayMensajes
    );

    this.nuevoMensaje = '';
  }
  datos(
    id: number,
    id_usuario: number,
    id_usuario2: number,
    arrayMensajes: number[]
  ) {
    const Chat = {
      id: id,
      id_usuario: id_usuario,
      id_usuario2: id_usuario2,
      arrayMensajes: arrayMensajes,
    };
    console.log(Chat);
  }
  private generarNuevoIdMensaje(): number {
    return Object.keys(this.mensajes).length + 1;
  }

  private obtenerFechaActual(): string {
    const fecha = new Date();
    return `${fecha.getMonth() + 1}-${fecha.getDate()}-${fecha.getFullYear()}`;
  }
}
