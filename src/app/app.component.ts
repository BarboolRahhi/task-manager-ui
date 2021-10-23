import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isOpen: boolean = false;

  onToggleHandler() {
    console.log('App');
    this.isOpen = !this.isOpen;
  }
}
