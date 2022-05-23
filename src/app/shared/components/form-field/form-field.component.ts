import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements OnInit {
  @Input()
  label: string = '';

  @Input()
  required: boolean = false;

  @Input()
  lableFor: string = '';

  constructor() {}

  ngOnInit(): void {}
}
