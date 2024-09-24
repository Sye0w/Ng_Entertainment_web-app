import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }


  pswdStr(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
    const hasLowerCase = /[a-z]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-\[\]{};\'":|,.<>/?]/.test(value);

    const passwordValid = hasLowerCase && hasUpperCase && hasNumeric && hasSpecialChar;

    return !passwordValid ? {
      passwordStrength: {
        hasLowerCase,
        hasUpperCase,
        hasNumeric,
        hasSpecialChar,
      }
    } : null;
  }
}
