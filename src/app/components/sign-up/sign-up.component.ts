import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../models/country';
import { CustomValidatorsService } from '../../services/custom-validators.service';
import { LoginService } from '../../services/login.service';
import { SignUpViewModel } from '../../models/sign-up-view-model';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from 'src/app/gaurds/can-deactivate-gaurd.service';
 

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, CanComponentDeactivate {
  signUpForm: FormGroup;
  genders = ["Male", "Female", "Others"];
  countries: Country[] = [];
  submitted = false;
  passwordFieldType: 'text' | 'password' = 'password'; // Default to password
  registerError: string = '';
  canLeave: boolean = true; 

  constructor(
    private countriesService: CountriesService,
    private fb: FormBuilder,
    private customValidatorsService: CustomValidatorsService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')]],
      lastName: [null, [Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.required, Validators.email]],
      mobile: [null, [Validators.required, Validators.pattern('^[789]\\d{9}$')]],
      dateOfBirth: [null, [Validators.required, this.customValidatorsService.minimumAgeValidator(18)]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      countryID: [null, [Validators.required]],
      skills: this.fb.array([])
    }, {
      validators: [
        this.customValidatorsService.compareValidator("password", "confirmPassword")
      ]
    });

    // Listen to form changes to handle unsaved changes warning
    this.signUpForm.valueChanges.subscribe(() => {
      this.canLeave = false;
    });
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  // Load countries from the service
  loadCountries(): void {
    this.countriesService.getCountries().subscribe({
      next: (countries) => this.countries = countries,
      error: (err) => console.error('Error fetching countries:', err)
    });
  }

  get skills(): FormArray {
    return this.signUpForm.get('skills') as FormArray;
  }

  get skillControls() {
    return this.skills.controls;
  }

  onAddSkill() {
    const formGroup = this.fb.group({
      skillsName: [null],
      level: ["Please Select"]
    });
    this.skills.push(formGroup);
  }

  onRemoveClick(index: number) {
    this.skills.removeAt(index);
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmitClick() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return; 
    }

    const signUpViewModel = this.signUpForm.value as SignUpViewModel;
    this.loginService.register(signUpViewModel).pipe(
      catchError((error: any) => {
        console.error('Signup error', error);
        this.registerError = this.getErrorMessage(error);
        return of(null);
      })
    ).subscribe(
      (response: any) => {
        if (response) {
          console.log('Signup successful at component', response);
          this.canLeave = true;
          this.router.navigate(['/Employee/tasks']);
        }
      }
    );
  }

  private getErrorMessage(error: any): string {
    if (error.status === 401) {
      return 'Unauthorized: Please check your credentials or try again later.';
    }
    return 'Unable to submit: ' + (error.error?.message || 'Unknown error occurred');
  }
}
