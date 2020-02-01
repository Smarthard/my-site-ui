import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Article, IArticle} from "../../../shared/api/Article";
import {Observable} from "rxjs";
import {map, pluck} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  static readonly API = '/api/articles';

  private _mapArticle = map((article: IArticle) => new Article(
      article.id,
      article.name,
      article.text,
      new Date(article.createdAt)
      )
  );

  constructor(private http: HttpClient) {}

  public create(article: Article): Observable<Article> {
    return this.http.post<Article>(ArticlesService.API, article);
  }

  public getById(id: string): Observable<Article> {
    return this.http.get<IArticle>(`${ArticlesService.API}/${id}`)
        .pipe(this._mapArticle);
  }

  public getAll(params: HttpParams): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(ArticlesService.API, { params });
  }

  public update(article: Article): Observable<Article> {
    return this.http.put<IArticle>(`${ArticlesService.API}/${article.id}`, article)
        .pipe(this._mapArticle);
  }

  public delete(id: string): Observable<Article> {
    return this.http.delete<Article>(`${ArticlesService.API}/${id}`);
  }

  public count(): Observable<number> {
    return this.http.post<{ count: number }>(`${ArticlesService.API}/count`, {})
        .pipe(
            pluck("count")
        );
  }

}
