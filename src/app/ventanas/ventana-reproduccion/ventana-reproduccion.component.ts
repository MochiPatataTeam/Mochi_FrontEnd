// VentanaReproduccionComponent.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-ventana-reproduccion',
  templateUrl: './ventana-reproduccion.component.html',
  styleUrls: ['./ventana-reproduccion.component.css']
})
export class VentanaReproduccionComponent implements OnInit {
  id: number = 1;
  videoId: any = {};
  videopatata: { url?: SafeResourceUrl } = {};

  constructor(private authservice: AuthService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.videoId = {};
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.authservice.videoid(this.id).subscribe(
      (response) => {
        console.log(response);
        this.videoId = response;
        this.sanitizarUrls();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sanitizarUrls() {
    if (this.videoId.url) {
      this.videopatata.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoId.url);
    }
  }
}
