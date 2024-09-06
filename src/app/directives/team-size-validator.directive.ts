import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appTeamSizeValidator]',
  providers:[{provide:NG_VALIDATORS,useExisting:TeamSizeValidatorDirective,multi:true}]
})
export class TeamSizeValidatorDirective implements Validator {
  @Input('appTeamSizeValidator') divisibleBy: number = 5;  // Default value if not provided

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && value % this.divisibleBy !== 0) {
      return { 'pattern': { divisible: true } };
    }
    return null;
  }
}


