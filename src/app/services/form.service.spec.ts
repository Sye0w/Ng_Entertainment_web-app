import { TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { FormService } from './form.service';

describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getErrorMessage', () => {
    it('should return required error message', () => {
      const control = new FormControl('', Validators.required);
      control.markAsTouched();
      expect(service.getErrorMessage(control, 'Email')).toBe('Email is required');
    });

    it('should return email error message', () => {
      const control = new FormControl('invalid', [Validators.required, Validators.email]);
      control.markAsTouched();
      expect(service.getErrorMessage(control, 'Email')).toBe('Invalid email format');
    });
  });

  describe('getPswdViz', () => {
    it('should return empty string for valid input', () => {
      const control = new FormControl('password');
      expect(service.getPswdViz(control)).toBe('');
    });

    it('should return error message for empty input', () => {
      const control = new FormControl('', Validators.required);
      control.markAsTouched();
      expect(service.getPswdViz(control)).toBe("Can't be empty");
    });
  });

  describe('pswdStr', () => {
    it('should return null for strong password', () => {
      const control = new FormControl('StrongPass1!');
      expect(service.pswdStr(control)).toBeNull();
    });

    it('should return error object for weak password', () => {
      const control = new FormControl('weakpass');
      const result = service.pswdStr(control);
      expect(result).toHaveProperty('passwordStrength');
      expect(result?.passwordStrength).toEqual({
        hasLowerCase: true,
        hasUpperCase: false,
        hasNumeric: false,
        hasSpecialChar: false,
      });
    });
  });

  describe('getPasswordStrengthError', () => {
    it('should return appropriate error messages', () => {
      const control = new FormControl('weak', [Validators.minLength(8), service.pswdStr]);
      control.markAsTouched();
      expect(service.getPasswordStrengthError(control)).toBe('Password must be at least 8 characters long');

      control.setValue('weakpassword');
      expect(service.getPasswordStrengthError(control)).toBe('Password must contain at least one uppercase letter');

      control.setValue('Weakpassword');
      expect(service.getPasswordStrengthError(control)).toBe('Password must contain at least one number');

      control.setValue('Weakpassword1');
      expect(service.getPasswordStrengthError(control)).toBe('Password must contain at least one special character');
    });
  });
});
