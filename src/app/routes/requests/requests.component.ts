import {Component, OnInit} from '@angular/core';
import {Request} from '../../shared/api/Request';
import {ShikiRequestsService} from '../../services/api/shiki-requests/shiki-requests.service';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-requests',
    templateUrl: './requests.component.html',
    styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
    requests$: Observable<Request[]>;

    constructor(
        private requestsService: ShikiRequestsService
    ) {}

    private static _sortByUnreviewed(a: Request, b: Request): number {
        if (!a?.reviewed) {
            return -1;
        }

        if (!b?.reviewed) {
            return 1;
        }

        if (a?.reviewed && b?.reviewed) {
            return b.reviewed.getDate() - a.reviewed.getDate();
        }
    }

    private _refreshRequests(): void {
        this.requests$ = this.requestsService.getRequests().pipe(
            map((requests) => requests.sort(RequestsComponent._sortByUnreviewed))
        );
    }

    ngOnInit(): void {
        this._refreshRequests();
    }

    getNickname(requester: string): string {
        try {
            const url = new URL(requester);
            return decodeURI(url.pathname.slice(1));
        } catch (e) {
            return requester ?? 'unknown';
        }
    }

    getRequestType(request: Request): string {
        switch (request?.type) {
            case 'shikivideos':
                return 'update';
            case 'shikivideos_issue':
                return 'issue';
            case 'shikivideos_delete':
                return 'delete';
            default:
                return 'unknown';
        }
    }

    isApproved(request: Request): boolean {
        return request?.reviewed && request?.approved;
    }

    isEmpty(request: Request): boolean {
        return Object.keys(request.request)?.length === 0;
    }

    isRejected(request: Request): boolean {
        return request?.reviewed && !request?.approved;
    }

    isReviewed(request: Request): boolean {
        return !!request?.reviewed;
    }

    hasFeedback(request: Request): boolean {
        return !!request?.feedback;
    }

    approve(request: Request): void {
        this.requestsService.approve(request)
            .subscribe(
                () => this._refreshRequests(),
                (err) => {
                    console.error(err);
                    return of(null);
                }
            );
    }

    reject(request: Request): void {
        this.requestsService.reject(request)
            .subscribe(
                () => this._refreshRequests(),
                (err) => {
                    console.error(err);
                    return of(null);
                }
            );
    }

    revert(request: Request): void {
        this.requestsService.revert(request)
            .subscribe(
                () => this._refreshRequests(),
                (err) => {
                    console.error(err);
                    return of(null);
                }
            );
    }
}
