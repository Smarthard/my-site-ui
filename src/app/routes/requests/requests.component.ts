import {Component, OnInit} from '@angular/core';
import {Request} from '../../shared/api/Request';
import {ShikiRequestsService} from '../../services/api/shiki-requests/shiki-requests.service';
import {Observable, of} from 'rxjs';
import {map, shareReplay, tap} from 'rxjs/operators';

@Component({
    selector: 'app-requests',
    templateUrl: './requests.component.html',
    styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
    allRequests$: Observable<Request[]>;
    reviewedRequests$: Observable<Request[]>;
    unreviewedRequests$: Observable<Request[]>;

    feedbackSectionsStateMap = new Map<number, boolean>();

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
        this.allRequests$ = this.requestsService.getRequests().pipe(
            map((requests) => [...requests.sort(RequestsComponent._sortByUnreviewed)]),
            shareReplay(1),
        );

        this.reviewedRequests$ = this.allRequests$.pipe(
            map((requests) => [...requests.filter((r) => r.reviewed)]),
            tap(console.log)
        );

        this.unreviewedRequests$ = this.allRequests$.pipe(
            map((requests) => [...requests.filter((r) => !r.reviewed)]),
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
        return Object.keys(request?.request || {})?.length === 0;
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

    trackById(index, item) {
        return item.id;
    }

    isFeedbackSectionOpened(requestId: number) {
        return !!this.feedbackSectionsStateMap.get(requestId);
    }

    toogleFeedbackSection(requestId: number) {
        const state = !this.feedbackSectionsStateMap.get(requestId);

        this.feedbackSectionsStateMap.set(requestId, state);
    }
}
