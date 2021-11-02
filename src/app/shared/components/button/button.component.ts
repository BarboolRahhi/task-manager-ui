import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  @Input()
  type: string = 'button';

  @Input()
  loading!: Observable<boolean>;

  @HostBinding('class.w-100')
  @Input()
  full: boolean = false;

  @Input()
  color: string = 'primary';

  @Input()
  disabled: boolean = false;

  @Output()
  onClick: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClickHandler() {
    this.onClick.emit();
  }
}
