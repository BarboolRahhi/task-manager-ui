import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';

type ButtonType = 'button' | 'submit';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  @Input()
  type: ButtonType = 'button';

  @Input()
  loading: boolean | null = false;

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
