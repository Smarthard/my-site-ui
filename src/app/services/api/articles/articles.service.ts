import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Article} from "../../../shared/api/Article";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  static readonly API: string = environment.apiUrl + '/api/articles';

  constructor(private http: HttpClient) {}

  public static create(article: Article): Promise<Article> {
    return new Promise<Article>((resolve, reject) => {

    });
  }

  public get(id: string): Promise<Article> {
    return new Promise<Article>((resolve, reject) => {

    });
  }

  public getAll(limit?: number, offset?: number): Promise<Article[]> {
    return new Promise<Article[]>((resolve, reject) => {
      let request: string = ArticlesService.API;

      if (limit && offset) {
        request += "?limit=" + limit + "&offset=" + offset;
      } else if (limit) {
        request += "?limit=" + limit;
      } else if (offset) {
        request += "?offset=" + offset;
      }

      this.http.get(request).subscribe(values => {
        let articles = [];

        for (let value in values) {
          articles.push(new Article(values[value]));
        }

        resolve(articles);
      }, err => {
        reject(err);
      });
    });
  }

  public update(article: Article): Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject) => {

    });
  }

  public delete(article: Article): Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject) => {

    })
  }

}
