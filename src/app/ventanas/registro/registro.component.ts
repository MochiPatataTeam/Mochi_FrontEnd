import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistroComponent {
  steps: string[] = ['Datos Personales', 'Datos Del Canal'];
  constructor(
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

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

  isSubmitting: boolean = false;

  //Validadores
  loginForm: FormGroup;
  touched = {
    nombre: false,
    primerApellido: false,
    segundoApellido: false,
    username: false,
    password: false,
    email: false,
    telefono: false,
    nombre_canal: false,
    descripcion: false,
    // imagen: false,
  };

  ngOnInit() {
    this.loginForm = this.fb.group({
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      nombre_canal: ['', Validators.required],
      descripcion: ['', Validators.required],
      // imagen: ['', Validators.required],
    });
    
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

  //REGISTRO
  registrarAction() {
    this.isSubmitting = true;
    let payload = {
      nombre: this.nombre,
      apellidos: this.primerApellido,
      username: this.username,
      password: this.password,
      email: this.email,
      telefono: this.telefono,
      nombre_canal: this.nombre_canal,
      descripcion: this.descripcion,
    };

    this.authService.registrar(payload).subscribe(
      ({ data }) => {
        console.log('Registrado c:', data);
        this.router.navigateByUrl('/Inicio');

        // this.authService.login(payload.username, payload.password).subscribe(
        //   (loginData) => {
        //     localStorage.setItem('jwt', JSON.stringify(loginData));
        //     this.router.navigateByUrl('/Inicio');
        //   },
        // );
      },
      (error) => {
        console.error(':C', error);
        this.isSubmitting = false;
      }
    );
  }
}
