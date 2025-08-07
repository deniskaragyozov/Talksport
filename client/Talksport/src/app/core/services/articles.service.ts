import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Article } from "../../models/article.model";


@Injectable({
    providedIn: 'root'
})

export class ArticlesService {
    private apiUrl = 'http://localhost:3000/api/articles';

    constructor(private httpClient: HttpClient) { }

    getArticles(): Observable<Article[]> {
        return this.httpClient.get<Article[]>(this.apiUrl);
    }

    getArticle(articleId: string | null): Observable<Article> {
        return this.httpClient.get<Article>(`${this.apiUrl}/${articleId}`);
    }

    createArticle(title: string, imageUrl: string, description: string): Observable<Article> {
        return this.httpClient.post<Article>(this.apiUrl, {
            title,
            imageUrl,
            description
        },
            {
                withCredentials: true
            });
    }
}