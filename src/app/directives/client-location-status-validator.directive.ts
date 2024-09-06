import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appClientLocationStatusValidator]',
  providers:[{provide:NG_VALIDATORS,useExisting:ClientLocationStatusValidatorDirective,multi:true}]
})
export class ClientLocationStatusValidatorDirective implements Validator{

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    let isValid=true;
    if(control.value.txtNewprojectID==5){
      isValid=false;
    }
    if(isValid == true){
      return null
    }else{
      return {ClientLocationStatus:{valid:false}}//invalid
    }
    
  }

}
