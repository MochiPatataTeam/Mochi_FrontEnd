import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  id: any = null;
  constructor(public authService: AuthService, private location: Location){}

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('Id')!);
  }

  //----------------------------- LOGIN Y LOGOUT -----------------------------------
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUserName(): string | null {
    return this.authService.getUsername();
  }

  logout(): void{
    this.authService.logout();

  }

  getIdUsuario(): number | null {
    return this.authService.getId();
  }

}
