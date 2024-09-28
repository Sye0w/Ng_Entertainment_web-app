import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  getErrorMessage(control: AbstractControl, fieldName: string): string {
    if (control?.errors) {
      const errorType = Object.keys(control.errors)[0];
      switch (errorType) {
        case 'required':
          return `${fieldName} is required`;
        case 'email':
          return 'Invalid email format';
        case 'minlength':
          return `${fieldName} must be at least ${control.errors['minlength'].requiredLength} characters long`;
        case 'mismatch':
          return 'Passwords do not match';
        default:
          return 'Invalid input';
      }
    }
    return '';
  }

  getPswdViz(control: AbstractControl): string {
    if (control?.errors) {
      if (control.errors['required']) {
        return "Can't be empty";
      }
    }
    return '';
  }

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

  getPasswordStrengthError(control: AbstractControl | null): string {
    if (!control || !control.errors) return '';

    const errors = control.errors;

    if (errors['minlength']) {
      return `Password must be at least ${errors['minlength'].requiredLength} characters long`;
    }

    if (errors['passwordStrength']) {
      const strength = errors['passwordStrength'];
      if (!strength.hasLowerCase) return 'Password must contain at least one lowercase letter';
      if (!strength.hasUpperCase) return 'Password must contain at least one uppercase letter';
      if (!strength.hasNumeric) return 'Password must contain at least one number';
      if (!strength.hasSpecialChar) return 'Password must contain at least one special character';
    }

    return 'Invalid password';
  }


}
