import { Component } from '@angular/core';
import { Article } from '../../models';
import { Observable } from 'rxjs';
import { ArticlesService } from '../../core/services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  latestArticles: Article[] = [];
  latestArticles$: Observable<Article[]>;
  
    constructor(private articlesService: ArticlesService){
      this.latestArticles$ = this.articlesService.getLatestArticles();
    }
}
