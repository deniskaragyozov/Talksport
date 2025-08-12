import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArticlesService, AuthService } from '../../core/services';
import { Observable, forkJoin } from 'rxjs';
import { Article, User } from '../../models';
import { CommonModule } from '@angular/common';
import { switchMap, filter } from 'rxjs/operators';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  
  private authService = inject(AuthService);
  private articleService = inject(ArticlesService);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  
  user$: Observable<User>;
  userArticlesIds: string[] = [];
  userArticles$: Observable<Article[]>;
  editForm: FormGroup;
  editMode = signal<boolean>(false);
  isAuthor: boolean = false;


  constructor(){
    this.user$ = this.authService.getUser(
      this.route.snapshot.paramMap.get('userId')
    );

    this.userArticles$ = this.user$.pipe(
      filter((userData): userData is User => !!userData),
      switchMap((userData) =>
        forkJoin(userData.articles.map((id) => this.articleService.getArticle(id)))
      )
    );

    this.editForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      profilePic: ['', [Validators.pattern(/https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?/)]],
      bio: ['', [Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    this.user$.subscribe((userData) => {

      if (userData) {
        this.editForm.patchValue({
          username: userData.username,
          profilePic: userData.profilePic,
          bio: userData.bio
        })
      
      this.isAuthor = this.authService.isAuthor(this.route.snapshot.paramMap.get('userId'));

      }

    });

    this.route.params.subscribe(params => {
      this.loadProfile();
    });
  }

  get username(): AbstractControl<any, any> | null {
    return this.editForm.get('username');
  }

  get profilePic(): AbstractControl<any, any> | null {
    return this.editForm.get('profilePic');
  }

  get bio(): AbstractControl<any, any> | null {
    return this.editForm.get('bio');
  }

  get isUsernameValid(): boolean {
    return this.username?.invalid && (this.username?.dirty || this.username?.touched) || false;
  }

  get isProfilePicValid(): boolean {
    return this.profilePic?.invalid && (this.profilePic?.dirty || this.profilePic?.touched) || false;
  }

  get isBioValid(): boolean {
    return this.bio?.invalid && (this.bio?.dirty || this.bio?.touched) || false;
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

  onSubmit(): void {
    this.authService.editProfile(
      this.username?.value,
      this.profilePic?.value,
      this.bio?.value
    ).subscribe({
      next: () => {
        this.switchEditMode()
      },
      error: (err) => {
        console.log('An error occured while editing profile', err);
      }
    })
  }

  switchEditMode(): void {
    if (this.editMode()) {
      this.editMode.set(false);
    } else {
      this.editMode.set(true);
    }
  }

  loadProfile() {
    this.user$ = this.authService.getUser(this.route.snapshot.paramMap.get('userId'))

    this.userArticles$ = this.user$.pipe(
      filter((userData): userData is User => !!userData),
      switchMap((userData) =>
        forkJoin(userData.articles.map((id) => this.articleService.getArticle(id)))
      )
    );

  this.user$.subscribe((userData) => {

      if (userData) {
        this.editForm.patchValue({
          username: userData.username,
          profilePic: userData.profilePic,
          bio: userData.bio
        })
      
      this.isAuthor = this.authService.isAuthor(this.route.snapshot.paramMap.get('userId'));

      }

    });
  }


}
