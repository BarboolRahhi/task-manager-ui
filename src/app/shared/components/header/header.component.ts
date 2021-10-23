import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output()
  onToggle: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onMenuToggle() {
    console.log('click');
    this.onToggle.emit();
  }
}
