import { Component } from '@angular/core';
import { Article } from '../../models';
import { Observable } from 'rxjs';
import { ArticlesService } from '../../core/services';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  latestArticles: Article[] = [];
  latestArticles$: Observable<Article[]>;

  popularArticles: Article[] = [];
  popularArticles$: Observable<Article[]>;
  
    constructor(private articlesService: ArticlesService){
      this.latestArticles$ = this.articlesService.getLatestArticles();
      this.popularArticles$ = this.articlesService.getPopularArticles();

    }
}
