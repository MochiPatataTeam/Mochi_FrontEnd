import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  progreso: number = 0;
  valorMaximo: number = 100; // Establece el valor máximo de la barra de progreso

  constructor(private router: Router) {}

  ngOnInit() {
    setInterval(() => {
      this.aumentarProgreso();
    }, 1000);
  }

  aumentarProgreso() {
    // Aumenta el progreso en un valor específico (puedes ajustar según tus necesidades)
    this.progreso += 8;

    // Asegúrate de que el progreso no supere el valor máximo
    if (this.progreso > this.valorMaximo) {
      this.progreso = this.valorMaximo;

      this.router.navigate(['/perfil']);
    }
  }
}
