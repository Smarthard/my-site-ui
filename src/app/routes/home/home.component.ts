import {Component, EventEmitter, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {HttpParams} from '@angular/common/http';
import {publishReplay, refCount, switchMap} from 'rxjs/operators';

import {ArticlesService} from '../../services/api/articles/articles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  readonly PAGE_SIZE = 20;
  readonly paginationEvents = new EventEmitter<PageEvent>();

  readonly articles$ = this.paginationEvents.pipe(
    switchMap(pageEvent => this.articlesService.getAll(new HttpParams()
        .set('limit', `${ pageEvent.pageSize }`)
        .set('offset', `${ pageEvent.pageSize * (pageEvent.pageIndex - 1) }`)
    ))
  );

  readonly articlesCount$ = this.articlesService.count()
      .pipe(
          publishReplay(1),
          refCount()
      );

  constructor(
      private articlesService: ArticlesService
  ) {}

  ngOnInit() {
    this.articlesCount$
        .subscribe(count =>
            this.paginationEvents.emit({ pageIndex: 1, pageSize: this.PAGE_SIZE, length: count })
        );
  }

}
