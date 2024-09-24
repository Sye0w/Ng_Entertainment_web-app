import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormValidationService } from '../../../services/form-validation.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule,MatButtonModule,ReactiveFormsModule,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})

export class SignUpComponent {
  signUpForm! : FormGroup;

  constructor(private validation: FormValidationService) { }

  ngOnInit(): void {
    this.initializeSignUpForm();
  }

  initializeSignUpForm() {
    this.signUpForm = new FormGroup({
      email: new FormControl('' , [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.minLength(6),
        this.validation.pswdStr]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }

  getFieldClass(fieldName: string): { [key: string]: boolean | undefined } {
    const formcontrol = this.signUpForm.get(fieldName);
    return {
      'border-viz': formcontrol?.invalid && (formcontrol?.touched || formcontrol?.dirty),
      'valid-field': formcontrol?.valid && (formcontrol?.touched || formcontrol?.dirty)
    }
  }

}
