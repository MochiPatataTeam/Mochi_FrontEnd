import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {BotonSidebarService} from "../../services/boton-sidebar.service";

@Component({
  selector: 'app-videos-tematica',
  templateUrl: './videos-tematica.component.html',
  styleUrls: ['./videos-tematica.component.css']
})
export class VideosTematicaComponent {
  tematica: string;
  videos: any[]=[];

  constructor(
    private authservice: AuthService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private botonsidebarservice: BotonSidebarService,
  ){

  }

  ngOnInit(): void{
    this.botonsidebarservice.tematicaSeleccionada$.subscribe(tematica => {
      this.tematica = tematica ?? ''; // Asigna una cadena vacía si tematica es null
      if (this.tematica) {
        this.loadVideos();
      }
    });


}
  loadVideos(): void {
    this.authservice.listTematicaByName(this.tematica!).subscribe((response: any) => {
      this.videos = response;
      this.sanitizarUrls();
    });}

  sanitizarUrls() {
    for (const vi of this.videos) {
      // Asegúrate de que 'url' sea una propiedad válida de tu objeto de video
      vi.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vi.url);
    }
  }
  videoDetails2(id: number) {
    this.router.navigate(['reproducir', id]);
  }

}
