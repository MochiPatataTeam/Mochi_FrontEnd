import { Component, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-campanita',
  templateUrl: './campanita.component.html',
  styleUrls: ['./campanita.component.css'],
})
export class CampanitaComponent {
  id!: number | null;
  notificaciones: any[] = [];
  countFalseVisible: number = 0;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private authservice: AuthService
  ) {}
  ngOnInit(): void {
    if (!this.id == null) {
      this.id = 0;
    } else {
      this.id = this.authservice.getStoredIdUsuario();
    }

    if (this.id != null) {
      this.authservice.notificaciones(this.id).subscribe(
        (response) => {
          this.notificaciones = response;
          this.countFalseVisible = this.countFalseNotifications();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  toggleNotification() {
    const notificationMenu =
      this.elRef.nativeElement.querySelector('.notification-menu');
    notificationMenu.style.display =
      notificationMenu.style.display === 'none' ||
      notificationMenu.style.display === ''
        ? 'block'
        : 'none';

    if (
      notificationMenu.style.display === 'none' &&
      this.countFalseVisible > 0
    ) {
      this.toggleNotificationVisibility();
    } else {
    }
  }

  countFalseNotifications(): number {
    return this.notificaciones.filter((notif) => !notif.visible).length;
  }

  hasFalseNotifications(): boolean {
    return this.notificaciones.some((notif) => !notif.visible);
  }

  toggleNotificationVisibility() {
    this.notificaciones.forEach((notif) => {
      if (!notif.visible) {
        notif.visible = true;
        this.authservice
          .notificacionesEdit(
            notif.id,
            notif.id_usuario,
            notif.id_tipo,
            notif.visible,
            notif.id_creador
          )
          .subscribe(
            (response) => {
              console.log(response);
            },
            (error) => {
              console.log(error);
            }
          );
      }
    });
    this.countFalseVisible = 0;
    console.log(this.notificaciones);
  }

  toggleLikeButton(btn: any) {
    this.renderer.addClass(btn, 'btn-like');
  }
}
