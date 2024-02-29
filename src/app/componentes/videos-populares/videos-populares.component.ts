import {Component, Input} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-videos-populares',
  templateUrl: './videos-populares.component.html',
  styleUrls: ['./videos-populares.component.css']
})
export class VideosPopularesComponent {
  @Input() limitarVideos2: boolean = false;
  videos: any[]=[];

  constructor(
    private authservice: AuthService,
    private sanitizer: DomSanitizer,
    private router: Router,

  ){
}

  ngOnInit(): void{
    this.authservice.listVideosPopulares().subscribe(
      (response:any)=>{
        this.videos=response;
        this.sanitizarUrls();
      },
      (error:any)=>{
        console.error('No consigo los videos', error);
      }
    )
  }
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
