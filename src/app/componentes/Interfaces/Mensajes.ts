export interface Mensajes {
  [key: number]: {
    id: number;
    mensaje: string;
    id_chatE: number;
    id_chatR: number;
    fecha: string;
    id_usuario: number;
  };
}
