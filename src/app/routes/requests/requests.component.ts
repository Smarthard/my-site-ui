import {Component, OnInit} from '@angular/core';
import {Request} from '../../shared/api/Request';
import {ShikiRequestsService} from '../../services/api/shiki-requests/shiki-requests.service';
import {Observable, of} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

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

    private static _sortByCreatedDate(a: Request, b: Request): number {
        return b.createdAt.getTime() - a.createdAt.getTime();
    }

    private static _sortByReviewDate(a: Request, b: Request): number {
        return b.reviewed.getTime() - a.reviewed.getTime();
    }

    private _refreshRequests(): void {
        this.allRequests$ = this.requestsService.getRequests().pipe(
            map((requests) => [...requests]),
            shareReplay(1),
        );

        this.reviewedRequests$ = this.allRequests$.pipe(
            map((requests) => [...requests
                .filter((r) => r.reviewed)
                .sort(RequestsComponent._sortByReviewDate)
            ]),
        );

        this.unreviewedRequests$ = this.allRequests$.pipe(
            map((requests) => [...requests
                .filter((r) => !r.reviewed)
                .sort(RequestsComponent._sortByCreatedDate)
            ]),
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
