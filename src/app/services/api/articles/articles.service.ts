import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Article} from "../../../shared/api/Article";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  static readonly API: string = environment.apiSecureUrl + '/api/articles';

  constructor(private http: HttpClient) {}

  public create(article: Article): Promise<Article> {
    return new Promise<Article>((resolve, reject) => {
      this.http.post(ArticlesService.API, article).subscribe(value => {
        resolve(new Article(value));
      }, err => {
        reject(err);
      })
    });
  }

  public get(id: string): Promise<Article> {
    return new Promise<Article>((resolve, reject) => {
      if (id) {
        this.http.get(ArticlesService.API + "/" + id).subscribe(value => {
          resolve(new Article(value));
        }, err => {
          reject(err);
        })
      } else {
        reject("Article id is not specified")
      }
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
      this.http.put(ArticlesService.API, article).subscribe(value => {
        resolve(true)
      }, err => {
        reject(false)
      })
    });
  }

  public delete(id: string): Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject) => {
      this.http.delete(ArticlesService.API + "/" + id).subscribe(value => {
        resolve(true);
      }, err => {
        reject(false);
      })
    })
  }

  public count(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.http.post(ArticlesService.API + "/count", {}).subscribe((value: {count: number}) => {
        resolve(value.count);
      }, err => {
        reject(err);
      });
    });
  }

}
