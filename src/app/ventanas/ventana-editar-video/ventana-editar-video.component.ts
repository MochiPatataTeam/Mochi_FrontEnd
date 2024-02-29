import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ventana-editar-video',
  templateUrl: './ventana-editar-video.component.html',
  styleUrls: ['./ventana-editar-video.component.css'],
})
export class VentanaEditarVideoComponent implements OnInit {
  titulo: string;
  url: string;
  descripcion: string;
  idTematicas: string = '';
  ventana: boolean = false;

  id: number;
  idCanal!: number | null;
  video: any;
  videoForm: FormGroup;
  tematicas: any;

  customButtonText: string = 'Guardar cambios';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (!this.idCanal == null) {
      this.idCanal = 0;
    } else {
      this.idCanal = this.authService.getStoredIdUsuario();
    }
    this.videoForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      url: [{ value: '', disabled: true }, Validators.required],
      tematica: ['', Validators.required],
      descripcion: [''],
    });
    this.authService.tematicas().subscribe(
      (response: any) => {
        this.tematicas = response;
        ////////////////---------------------------------

        this.authService.videoid(this.id).subscribe(
          (response) => {
            const tematicaEncontrada = this.tematicas.find(
              (t: { id: number; tematica: string }) =>
                t.tematica === response.tematica
            );

            if (tematicaEncontrada) {
              this.idTematicas = tematicaEncontrada.id;
            } else {
              console.error(`No se encontró la temática`);
            }

            // Resto del código
            this.titulo = response.titulo;
            this.url = response.url;
            this.descripcion = response.descripcion;
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }

  onSubmit(): void {
    this.ventana = true;
    if (this.idCanal != null) {
      this.authService
        .modificarVideo(
          this.id,
          this.titulo,
          this.descripcion,
          this.url,
          this.idCanal,
          this.idTematicas
        )
        .subscribe(
          (response) => {
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
