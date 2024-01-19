import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
  <app-navbar *ngIf="showNavbar"></app-navbar>
  <router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'Mochi_FrontEnd';

  showNavbar: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let currentRoute = this.activatedRoute;
      while (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
        this.showNavbar = currentRoute.snapshot.data['showNavbar'] !== false;
      }
    });
  }
}
