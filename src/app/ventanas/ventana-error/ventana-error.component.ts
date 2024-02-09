import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventana-error',
  templateUrl: './ventana-error.component.html',
  styleUrls: ['./ventana-error.component.css']
})
export class VentanaErrorComponent implements OnInit{

  customButtonText: string = 'Ir a inicio';
  errorMessage: string;
  errorType: number

  constructor(private router: Router){}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();

    if(navigation && navigation.extras.state) {
      this.errorType = navigation.extras.state['errorType'];
      this.errorMessage = navigation.extras.state['errorMessage'];
    } else {
      this.errorType = 500; 
      this.errorMessage = 'No funciono jaja';
    }
  }
}
