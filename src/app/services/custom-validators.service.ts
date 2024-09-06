import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }

  public minimumAgeValidator(minAge:number):ValidatorFn{
    return (control:AbstractControl):ValidationErrors|null =>{
      if(!control.value)
        return null;

      var today= new Date()
      var dateOfBirth = new Date(control.value);
      var diffMilSeconds = Math.abs(today.getTime()-dateOfBirth.getTime());
      var diffYears = (diffMilSeconds/(1000*60*60*24))/365.25

      if(diffYears>=minAge)
        return null; //valid
      else
        return {minAge:{valid:false}}; //invalid
    }
  }

  public compareValidator(controlToValidate: string, controlToCompare: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control1 = formGroup.get(controlToValidate);
      const control2 = formGroup.get(controlToCompare);
  
      if (!control1 || !control2) {
        return null;
      }
  
      if (control1.value !== control2.value) {
        control2.setErrors({ compareValidator: { valid: false } });
        return { compareValidator: { valid: false } };
      } else {
        control2.setErrors(null);
        return null;
      }
    };
  }
  
}
  
