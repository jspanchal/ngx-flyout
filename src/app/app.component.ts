import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  open = false;
  position = 'right';
  showCloseButton = true;
  showBackdrop = true;
  hideOnBackdropClick = true;

  togglePosition() {
    if (this.position === 'right') {
      this.position = 'bottom';
    } else if (this.position === 'bottom') {
      this.position = 'left';
    } else if (this.position === 'left') {
      this.position = 'top';
    } else if (this.position === 'top') {
      this.position = 'right';
    }
  }
}
