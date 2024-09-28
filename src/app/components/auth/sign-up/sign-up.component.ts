import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { FormValidationService } from '../../../services/form-validation.service';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, MatButtonModule, ReactiveFormsModule, CommonModule,ToastModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  providers: [MessageService]
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validation: FormValidationService,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.initializeSignUpForm();
  }

  initializeSignUpForm() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.validation.pswdStr]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.matchValidator });
  }

  matchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'mismatch': true };
  }

  getFieldClass(fieldName: string): { [key: string]: boolean | undefined } {
    const control = this.signUpForm.get(fieldName);
    return {
      'border-viz': control?.invalid && (control?.touched || control?.dirty),
      'valid-field': control?.valid && (control?.touched || control?.dirty)
    };
  }

  getEmailErrorMsg() {
    const control = this.signUpForm.get('email');
    if (control?.errors) {
      if (control.errors['required']) return 'Email is required';
      if (control.errors['email']) return 'Invalid email format';
    }
    return '';
  }

  getPswdErrMsg() {
    const control = this.signUpForm.get('password');
    if (control?.errors) {
      if (control.errors['required']) return 'Password is required';
    }
    return '';
  }
  getConfirmPswdErrMsg() {
    const control = this.signUpForm.get('confirmPassword');
    if (control?.errors) {
      if (control.errors['required']) return 'Confirm Password is required';
      if (control.errors['minlength']) return `Password must be at least ${control.errors['minlength'].requiredLength} characters long`;
      if (control.errors['mismatch']) return 'Passwords do not match';
    }
    return '';
  }

  getPasswordStrengthError(): string {
    const control = this.signUpForm.get('password');
    if (control?.errors?.['passwordStrength']) {
      const strength = control.errors['passwordStrength'];
      if (!strength.hasLowerCase) return 'Password must contain at least one lowercase letter';
      if (!strength.hasUpperCase) return 'Password must contain at least one uppercase letter';
      if (!strength.hasNumeric) return 'Password must contain at least one number';
      if (!strength.hasSpecialChar) return 'Password must contain at least one special character';
    }
    return '';
  }

  signup() {
    if (this.signUpForm.valid) {
      const { email, password } = this.signUpForm.value;
      this.authService.signup({ email, password }).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message || 'Signup successful!'
          });
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message || 'An error occurred during signup. Please try again.'
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Form',
        detail: 'Please fill all required fields correctly.'
      });
    }
  }
}
