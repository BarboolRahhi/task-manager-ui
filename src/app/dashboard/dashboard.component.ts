import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isOpen: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  onToggleHandler() {
    console.log('App');
    this.isOpen = !this.isOpen;
  }
}
