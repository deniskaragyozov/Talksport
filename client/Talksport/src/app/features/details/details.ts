import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Article } from '../../models/article.model';
import { Observable, of, switchMap } from 'rxjs';
import { ArticlesService, AuthService } from '../../core/services';
import { User } from '../../models';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit {

  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  articleId: string = '';
  article$: Observable<Article>;
  userId: string = '';
  user$: Observable<User>;
  editForm: FormGroup;
  isAuthor: boolean = false;
  hasLiked$: Observable<boolean> = of(false);
  likes: Array<string> = [];

  editMode = signal<boolean>(false);

  readonly isLoggedIn = this.authService.isLoggedIn;

  constructor(private articlesService: ArticlesService) {
    this.article$ = this.articlesService.getArticle(this.route.snapshot.paramMap.get('articleId'));
    this.user$ = this.article$.pipe(
      switchMap(article => this.authService.getUser(article.userId))
    );
    this.editForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      imageUrl: ['', [Validators.pattern(/https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?/)]],
      description: ['', [Validators.required, Validators.minLength(15)]],
    });
  }

  ngOnInit(): void {
    this.article$.subscribe((articleData) => {
      if (articleData) {
        this.editForm.patchValue({
          title: articleData.title,
          imageUrl: articleData.imageUrl,
          description: articleData.description
        });
        this.articleId = articleData._id;
        this.userId = articleData.userId;
        this.isAuthor = this.authService.isAuthor(this.userId);
        this.likes = articleData.likes;
        this.hasLiked$ = this.authService.hasLiked(this.likes);
      }
    });
  }

  get title(): AbstractControl<any, any> | null {
    return this.editForm.get('title');
  }

  get imageUrl(): AbstractControl<any, any> | null {
    return this.editForm.get('imageUrl');
  }

  get description(): AbstractControl<any, any> | null {
    return this.editForm.get('description');
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
    this.articlesService.editArticle(
      this.title?.value,
      this.imageUrl?.value,
      this.description?.value,
      this.route.snapshot.paramMap.get('articleId')
    ).subscribe({
      next: () => {
        this.switchEditMode()
      },
      error: (err) => {
        console.log('An error occured while editing article', err);
      }
    })
  }

  deleteArticle(): void {
    this.articlesService.deleteArticle(this.articleId).subscribe(
      {
        next: () => {
          this.router.navigate(['/articles'])
        },
        error: (err) => {
          console.log('An error occured while deleting article', err)
        }
      }
    );
  }

  likeArticle(): void {
    this.articlesService.likeArticle(this.articleId).subscribe(
      {
        next: () => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/articles', this.articleId]);
        })
        },
        error: (err) => {
          console.log('An error occured while liking article', err)
        }
      }
    );
  }


  switchEditMode(): void {
    if (this.editMode()) {
      this.editMode.set(false);
    } else {
      this.editMode.set(true);
    }
  }
}
