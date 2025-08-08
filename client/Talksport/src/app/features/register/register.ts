import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  //TODO: FIX PASSWORD MISMATCH AND INPUTS
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern(/^(?=.{6,})[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      profilePic: ['', [Validators.pattern(/https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?/)]],
      bio: ['', [Validators.minLength(2)]],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
        rePassword: ['', [Validators.required]],
      }, {validators: this.passwordMatchValidator})
    })
  }

  get username(): AbstractControl<any, any> | null {
    return this.registerForm.get('username');
  }

  get email(): AbstractControl<any, any> | null {
    return this.registerForm.get('email');
  }

  get profilePic(): AbstractControl<any, any> | null {
    return this.registerForm.get('profilePic');
  }

  get bio(): AbstractControl<any, any> | null {
    return this.registerForm.get('bio');
  }

  get passwords(): FormGroup<any> {
    return this.registerForm.get('passwords') as FormGroup;
  }

  get password(): AbstractControl<any, any> | null {
    return this.passwords.get('password');
  }

  get rePassword(): AbstractControl<any, any> | null {
    return this.passwords.get('rePassword');
  }

  get isUsernameValid(): boolean {
    return this.username?.invalid && (this.username?.dirty || this.username?.touched) || false;
  }

  get isEmailValid(): boolean {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched) || false;
  }

  get isProfilePicValid(): boolean {
    return this.profilePic?.invalid && (this.profilePic?.dirty || this.profilePic?.touched) || false;
  }

  get isBioValid(): boolean {
    return this.bio?.invalid && (this.bio?.dirty || this.bio?.touched) || false;
  }

  get isPasswordValid(): boolean {
    return this.passwords?.invalid && (this.passwords?.dirty || this.passwords?.touched) || false;
  }

  get usernameErrorMessage(): string {
    if (this.username?.errors?.['required']) {
      return 'Username is required!';
    }

    if (this.username?.errors?.['minlength']) {
      return 'Username should be at least 5 characters long!';
    }

    return '';
  }

  get emailErrorMessage(): string {
    if (this.email?.errors?.['required']) {
      return 'Email is required!';
    }

    if (this.email?.errors?.['pattern']) {
      return 'Invalid email!';
    }

    return '';
  }

   get profilePicErrorMessage(): string {
    if (this.profilePic?.errors?.['pattern']) {
      return 'Invalid link!';
    }

    return '';
  }

  get bioErrorMessage(): string {

    if (this.bio?.errors?.['minlength']) {
      return 'Bio should be at least 2 characters long!';
    }

    return '';
  }

  get passwordErrorMessage(): string {
    if (this.password?.errors?.['required']) {
      return 'Password is required!';
    }

    if (this.password?.errors?.['minlength']) {
      return 'Password should be at least 5 characters long!';
    }

    if (this.password?.errors?.['pattern']) {
      if (this.password?.errors?.['pattern']) {
        return 'Invalid password!';
      }
    }

    return '';
  }

  get rePasswordErrorMessage(): string {
    if (this.rePassword?.errors?.['required']) {
      return 'Repeat password is required!';
    }

    if (this.passwords?.errors?.['passwordMismatch']) {
        return 'Passwords do not match!';
    }

    return '';
  }

  onSubmit(): void{
    if(this.registerForm.valid){
      const { username, email, profilePic, bio } = this.registerForm.value;
      const { password, rePassword } = this.registerForm.value.passwords;
      
      this.authService.register(
        username,
        email,
        profilePic,
        bio,
        password,
        rePassword).subscribe({
          next: () => {
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.log('An error occured in registration', err)
            this.markFormGroupTouched();
          }
        })
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if(control instanceof FormGroup) {
        Object.keys(control.controls).forEach(nestedKey => {
          const nestedControl = control.get(nestedKey);
          nestedControl?.markAllAsTouched();
        })
      }else{
        control?.markAsTouched();
      }
    })
  }

  private passwordMatchValidator(passwordsControl: AbstractControl): ValidationErrors | null {
    const password = passwordsControl.get('password');
    const rePassword = passwordsControl.get('rePassword');

    if (password && rePassword && password.value !== rePassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }

}
