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
  userArticles: Article[] = [];


  constructor(){
    this.user$ = this.authService.getUser(this.route.snapshot.paramMap.get('userId'));

    this.user$
  .pipe(
    filter((userData): userData is User => !!userData), // ensure it's not null
    switchMap((userData) => {
      this.userArticlesIds = userData.articles;

      const articleRequests = this.userArticlesIds.map((id) =>
        this.articleService.getArticle(id)
      );

      return forkJoin(articleRequests);
    })
  )
  .subscribe((articles: Article[]) => {
    this.userArticles = articles;
  });
    
  }

}
