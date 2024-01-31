import { Component,ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistroComponent {
  steps: string[] = [
    'Datos Personales',
    'Datos Del Canal'
  ];
  constructor(private sanitizer: DomSanitizer) {}

  numPage: number = 1;
  nombre!: string;
  primerApellido!: string;
  segundoApellido!: string;
  username!: string;
  password!: string;
  email!: string;
  telefono!: string;
  nombre_canal!: string;
  descripcion!: string;
  suscripciones!: 0;
  imagen!: string;

  Datos(
    nombre: string,
    primerApellido: string,
    segundoApellido: string,
    username: string,
    password: string,
    email: string,
    telefono: string,
    nombre_canal: string,
    descripcion: string,
    imagen: string
  ) {
    const Usuario = {
      nombre: nombre,
      apellidos: primerApellido + ' ' + segundoApellido,
      username: username,
      password: password,
      email: email,
      telefono: telefono,
      nombre_canal: nombre_canal,
      descripcion: descripcion,
      suscripciones: 0,
      imagen: imagen,
    };
    console.log(Usuario);
  }
  avanzar() {
    this.numPage = this.numPage + 1;
    console.log(this.numPage);
  }
  volver() {
    this.numPage = this.numPage - 1;
    console.log(this.numPage);
  }
}
