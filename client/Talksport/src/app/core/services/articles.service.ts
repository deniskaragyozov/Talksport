import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Article } from "../../models/article.model";


@Injectable({
    providedIn: 'root'
})

export class ArticlesService {
    private apiUrl = 'http://localhost:3000/api/articles';

    constructor(private httpClient: HttpClient) {}

    getArticles(): Observable<Article[]>{
        return this.httpClient.get<Article[]>(this.apiUrl);
    }
}