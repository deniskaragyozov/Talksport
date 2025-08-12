import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticlesService } from '../../core/services/articles.service';
import { Article } from '../../models/article.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TimeAgoPipe } from '../../shared/pipes';


@Component({
  selector: 'app-articles',
  imports: [RouterLink, CommonModule, TimeAgoPipe],
  templateUrl: './articles.html',
  styleUrl: './articles.css'
})
export class Articles {

  articles: Article[] = [];
  articles$: Observable<Article[]>;

  constructor(private articlesService: ArticlesService){
    this.articles$ = this.articlesService.getArticles();
  }


}
