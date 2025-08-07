import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Article } from '../../models/article.model';
import { Observable } from 'rxjs';
import { ArticlesService } from '../../core/services';

@Component({
  selector: 'app-details',
  imports: [RouterLink, CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details {
  article$: Observable<Article>;

  private route = inject(ActivatedRoute)

  constructor(private articlesService: ArticlesService) {
    this.article$ = this.articlesService.getArticle(this.route.snapshot.paramMap.get('articleId') );
  }
}
