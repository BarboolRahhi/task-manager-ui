import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  /**
   * check valadition for two fields are equal are not
   * @param controlName
   * @param checkControlName
   * @returns ValidatorFn
   */
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors.matching) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}
