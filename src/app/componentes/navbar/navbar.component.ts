import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(public authService: AuthService){}

  ngOnInit(): void {

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

}
