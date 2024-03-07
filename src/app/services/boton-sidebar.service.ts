import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BotonSidebarService {

  mostrarVideosPopulares: boolean = false;
  mostrarVideosSuscripciones: boolean = false;
  mostrarVideosTematica: boolean = false;

  private tematicaSeleccionadaSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  tematicaSeleccionada$: Observable<string | null> = this.tematicaSeleccionadaSubject.asObservable();

  constructor() { }

  actualizarTematica(tematica: string): void {
    this.tematicaSeleccionadaSubject.next(tematica);
  }
}
