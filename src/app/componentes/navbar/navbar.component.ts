import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  id: any = null;
  input: string = '';

  constructor(
    public authService: AuthService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  enviarDatos() {
    this.router.navigate(['/buscador'], { queryParams: { dato: this.input } });

    setTimeout(() => {
      const queryParams = this.route.snapshot.queryParams;
      const isBuscadorRoute =
        this.router.url.includes('/buscador') && queryParams['dato'];

      if (isBuscadorRoute) {
        console.log('Se activó el reload');
        window.location.reload();
      }

      console.log('Se activó');
    }, 100);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.input = params['dato'] || '';
    });
    this.id = JSON.parse(localStorage.getItem('Id')!);
  }

  //----------------------------- LOGIN Y LOGOUT -----------------------------------
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUserName(): string | null {
    return this.authService.getUsername();
  }

  logout(): void {
    this.authService.logout();
  }

  getIdUsuario(): number | null {
    return this.authService.getId();
  }
}
