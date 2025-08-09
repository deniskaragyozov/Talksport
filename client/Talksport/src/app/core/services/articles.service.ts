import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Article } from "../../models/article.model";
import { User } from "../../models";


@Injectable({
    providedIn: 'root'
})

export class ArticlesService {
    private apiUrl = 'http://localhost:3000/api/articles';

    constructor(private httpClient: HttpClient) { }

    getArticles(): Observable<Article[]> {
        return this.httpClient.get<Article[]>(this.apiUrl);
    }

    getLatestArticles(limit: number = 3): Observable<Article[]> {
        return this.httpClient.get<Article[]>(`${this.apiUrl}/latest?limit={0}`.replace('{0}', limit.toString()));
    }

    getPopularArticles(limit: number = 3): Observable<Article[]> {
        return this.httpClient.get<Article[]>(`${this.apiUrl}/popular?limit={0}`.replace('{0}', limit.toString()));
    }

    getArticle(articleId: string | null): Observable<Article> {
        return this.httpClient.get<Article>(`${this.apiUrl}/${articleId}`);
    }

    createArticle(title: string, imageUrl: string, description: string, user: User | null): Observable<Article> {
        return this.httpClient.post<Article>(this.apiUrl, {
            title,
            imageUrl,
            description,
            user
        },
            {
                withCredentials: true
            });
    }

    editArticle(title: string, imageUrl: string, description: string, articleId: string | null) {
        return this.httpClient.put<Article>(`${this.apiUrl}/${articleId}/edit`, {
            title,
            imageUrl,
            description
        },
            {
                withCredentials: true
            });
    }

    deleteArticle(articleId: string | null) {
        return this.httpClient.delete<Article>(`${this.apiUrl}/${articleId}/delete`,
            {
                withCredentials: true
            });
    }

    likeArticle(articleId: string | null) {
        return this.httpClient.put<Article>(`${this.apiUrl}/${articleId}/like`, { articleId }, {
            withCredentials: true
        })
    }
}