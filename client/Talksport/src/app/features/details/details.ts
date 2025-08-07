import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Article } from '../../models/article.model';
import { Observable, switchMap } from 'rxjs';
import { ArticlesService, AuthService } from '../../core/services';
import { User } from '../../models';

@Component({
  selector: 'app-details',
  imports: [RouterLink, CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details {

  article$: Observable<Article>;
  user$: Observable<User>;

  private route = inject(ActivatedRoute)

  constructor(private articlesService: ArticlesService, private authService: AuthService) {
    this.article$ = this.articlesService.getArticle(this.route.snapshot.paramMap.get('articleId'));
    this.user$ = this.article$.pipe(
      switchMap(article => this.authService.getUser(article.userId))
    );
  }
}
