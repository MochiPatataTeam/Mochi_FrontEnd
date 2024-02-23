import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BotonSidebarService {

  mostrarVideosPopulares: boolean = false;
  mostrarVideosSuscripciones: boolean = false;

  constructor() { }
}
