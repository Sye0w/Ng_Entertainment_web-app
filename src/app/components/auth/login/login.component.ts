import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormValidationService } from '../../../services/form-validation.service';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, MatButtonModule, ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private validation: FormValidationService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        this.validation.pswdStr
      ])
    });
  }

  getFieldClass(fieldName: string): { [key: string]: boolean | undefined } {
    const formcontrol = this.loginForm.get(fieldName);
    return {
      'border-viz': formcontrol?.invalid && (formcontrol?.touched || formcontrol?.dirty),
      'valid-field': formcontrol?.valid && (formcontrol?.touched || formcontrol?.dirty)
    };
  }

  getErrorMessage(fieldName: string): string {
    const control = this.loginForm.get(fieldName);
    if (control?.errors) {
      const errorType = Object.keys(control.errors)[0];
      switch (errorType) {
        case 'required':
          return `Email is required`;
        case 'email':
          return 'Invalid email format';
        default:
          return 'Invalid input';
      }
    }
    return '';
  }

  getPswdViz(fieldName: string) {
    const control = this.loginForm.get(fieldName);
    if (control?.errors) {
      if (control.errors['required']) {
        return "Can't be empty";
      }
    }
    return '';
  }

  getPswdVizStr(fieldName: string) {
    const control = this.loginForm.get(fieldName);
    if (control?.errors) {
      if (control.errors['minlength']) {
        return 'Password must be at least 6 characters long';
      }
      if (control.errors['passwordStrength']) {
        const strength = control.errors['passwordStrength'];
        if (!strength.hasLowerCase) return 'Password must contain at least one lowercase letter';
        if (!strength.hasUpperCase) return 'Password must contain at least one uppercase letter';
        if (!strength.hasNumeric) return 'Password must contain at least one number';
        if (!strength.hasSpecialChar) return 'Password must contain at least one special character';
      }
    }
    return 'Invalid input';
  }

  login() {
    if (this.loginForm.valid) {
      console.log('logged in');
      const { email, password } = this.loginForm.value;
      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Login Successful',
            detail: 'You have been logged in successfully.'
          });
          localStorage.setItem('token', response.token);
          this.router.navigate(['/app/home']);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: error.error.message || 'An error occurred during login. Please try again.'
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Form',
        detail: 'Please fill in all required fields correctly.'
      });
    }
  }
}
