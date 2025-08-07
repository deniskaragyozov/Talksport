import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './post.html',
  styleUrl: './post.css'
})
export class Post {
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  postForm: FormGroup;

  constructor() {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      imageUrl: ['', [Validators.pattern(/https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?/)]],
      description: ['', [Validators.required, Validators.minLength(15)]],
    })
  }

  get title(): AbstractControl<any, any> | null {
    return this.postForm.get('title');
  }

  get imageUrl(): AbstractControl<any, any> | null {
    return this.postForm.get('imageUrl');
  }

  get description(): AbstractControl<any, any> | null {
    return this.postForm.get('description');
  }

  get isTitleValid(): boolean {
    return this.title?.invalid && (this.title?.dirty || this.title?.touched) || false;
  }

  get isImageUrlValid(): boolean {
    return this.imageUrl?.invalid && (this.imageUrl?.dirty || this.imageUrl?.touched) || false;
  }

  get isDescriptionValid(): boolean {
    return this.description?.invalid && (this.description?.dirty || this.description?.touched) || false;
  }

  get titleErrorMessage(): string {
    if (this.title?.errors?.['required']) {
      return 'Title is required!';
    }

    if (this.title?.errors?.['minlength']) {
      return 'Title should be at least 2 characters long!';
    }

    return '';
  }

  get imageUrlErrorMessage(): string {
    if (this.imageUrl?.errors?.['pattern']) {
      return 'Invalid image URL!';
    }

    return '';
  }

  get descriptionErrorMessage(): string {
    if (this.description?.errors?.['required']) {
      return 'Description is required!';
    }

    if (this.description?.errors?.['minlength']) {
      return 'Description should be at least 15 characters long!';
    }

    return '';
  }

  onSubmit(): void {
    if (this.postForm.valid) {

    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.postForm.controls).forEach(key => {
      const control = this.postForm.get(key);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(nestedKey => {
          const nestedControl = control.get(nestedKey);
          nestedControl?.markAllAsTouched();
        })
      } else {
        control?.markAsTouched();
      }
    })
  }

}
