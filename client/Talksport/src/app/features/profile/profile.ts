import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArticlesService, AuthService } from '../../core/services';
import { Observable, forkJoin } from 'rxjs';
import { Article, User } from '../../models';
import { CommonModule } from '@angular/common';
import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  
  private authService = inject(AuthService);
  private articleService = inject(ArticlesService);
  private route = inject(ActivatedRoute);
  
  user$: Observable<User>;
  userArticlesIds: string[] = [];
  userArticles$: Observable<Article[]>;


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
  }

}
