import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  progreso: number = 0;
  valorMaximo: number = 100;

  constructor(private router: Router, private location: Location) {}

  ngOnInit() {
    setInterval(() => {
      this.aumentarProgreso();
    }, 1000);
  }

  aumentarProgreso() {

    this.progreso += 8;

    if (this.progreso > this.valorMaximo) {
      this.progreso = this.valorMaximo;

      this.router.navigate(['../Inicio']);
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (this.router.url === '/Inicio') {
            this.location.replaceState(this.router.url);
            window.location.reload();
          }
        }
      });
    }
  }
}
