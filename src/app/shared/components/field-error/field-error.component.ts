import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-field-error',
  template: `
    <div
      *ngIf="isInvalid"
      class="text-danger error-size position-absolute w-100 text-end"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [' .error-size { font-size: 0.8rem; }  '],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldErrorComponent implements OnInit {
  @Input()
  isInvalid: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
