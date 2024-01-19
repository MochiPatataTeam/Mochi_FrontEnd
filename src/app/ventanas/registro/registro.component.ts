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
    'Datos Del Canal',
    'Preguntas Frecuentes',
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
  respuesta!: string;
  respuesta2!: string;
  respuesta3!: string;
  respuesta4!: string;

  preguntas = {
    respuesta: this.respuesta,
    respuesta2: this.respuesta2,
    respuesta3: this.respuesta3,
    respuesta4: this.respuesta4,
  };

  inputsStep1 = {
    nombre: { type: 'text', label: 'Nombre', name: 'nombre' },
    primerApellido: {
      type: 'text',
      label: 'Primer Apellido',
      name: 'primerApellido',
    },
    segundoApellido: {
      type: 'text',
      label: 'Segundo Apellido',
      name: 'segundoApellido',
    },
    telefono: { type: 'text', label: 'Telefono', name: 'telefono' },
    email: { type: 'email', label: 'Email', name: 'email' },
  };
  inputsStep2 = {
    canal: { type: 'text', label: 'Nombre del Canal', name: 'nombre_canal' },
    username: { type: 'text', label: 'Usuario', name: 'username' },
    password: { type: 'password', label: 'Contraseña', name: 'password' },
    descripcion: {
      type: 'textarea',
      label: 'Descripcion',
      name: 'descripcion',
    },
    imagen: { type: 'text', label: 'Imagen', name: 'imagen' },
  };
  inputsStep3 = {
    pregunta1: { type: 'text', label: 'Pregunta 1', name: 'respuesta' },
    pregunta2: { type: 'text', label: 'Pregunta 2', name: 'respuesta2' },
    pregunta3: { type: 'text', label: 'Pregunta 3', name: 'respuesta3' },
    pregunta4: { type: 'text', label: 'Pregunta 4', name: 'respuesta4' },
  };

  generarInputs(inputs: any) {
    let htmlString = '';

    for (const key in inputs) {
      if (inputs.hasOwnProperty(key)) {
        const inputType = inputs[key].type;
        const inputLabel = inputs[key].label;
        const inputName = inputs[key].name;
        htmlString += this.generarInput(key, inputType, inputLabel, inputName);
      }
    }

    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }

  generarInput(
    nombre: string,
    tipo: string,
    label: string,
    inputName: string
  ): string {
    switch (tipo) {
      case 'text':
        return `
          <div class="input-box">
            <input
              required=""
              name="${inputName}"
              type="text"
              class="input"
              [(ngModel)]="${nombre}"
            />
            <label class="label text--flicking">${label}:</label>
          </div>
        `;
      case 'password':
        return `
          <div class="input-box">
            <input
              required=""
              name="${inputName}"
              type="password"
              class="input"
              [(ngModel)]="${nombre}"
            />
            <label class="label text--flicking">${label}:</label>
          </div>
        `;
      case 'textarea':
        return `
          <div class="input-box">
            <textarea
              required=""
              name="${inputName}"
              class="textarea"
              [(ngModel)]="${nombre}"
            ></textarea>
            <label class="label text--flicking">${label}:</label>
          </div>
        `;
      case 'email':
        return `
          <div class="input-box">
            <input
              required=""
              name="${inputName}"
              type="email"
              class="input"
              [(ngModel)]="${nombre}"
            />
            <label class="label text--flicking">${label}:</label>
          </div>
        `;
      default:
        return '';
    }
  }

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
