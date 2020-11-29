import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {IRequest, Request} from '../../../shared/api/Request';

@Injectable({
    providedIn: 'root'
})
export class ShikiRequestsService {

    constructor(private http: HttpClient) {}

    private static _createRequest(requestFromHttp: IRequest) {
        return new Request(
            requestFromHttp.id,
            requestFromHttp.type,
            requestFromHttp.target_id,
            requestFromHttp.requester,
            requestFromHttp.comment,
            requestFromHttp.request,
            requestFromHttp.old,
            requestFromHttp.approved,
            requestFromHttp.reviewer_id,
            requestFromHttp.reviewed,
            requestFromHttp.feedback,
            requestFromHttp.createdAt
        );
    }

    public getRequests(limit?: number, offset?: number): Observable<Request[]> {
        let params = new HttpParams();

        if (!isNaN(limit)) {
            params = params.set('limit', `${limit}`);
        }

        if (!isNaN(offset)) {
            params = params.set('offset', `${offset}`);
        }

        return this.http.get<IRequest[]>('https://smarthard.net/api/requests', {params})
            .pipe(
                map((requests) => requests.map((request) => ShikiRequestsService._createRequest(request)))
            );
    }

    public getRequestById(id: number): Observable<Request> {
        return this.http.get<IRequest>(`https://smarthard.net/api/requests/${id}`)
            .pipe(
                map((request) => ShikiRequestsService._createRequest(request))
            );
    }

    public approve(request: Request): Observable<Request> {
        return this.http.post<IRequest>(`https://smarthard.net/api/requests/${request.id}/approve`, {})
            .pipe(
                map((approvedRequest) => ShikiRequestsService._createRequest(approvedRequest))
            );
    }

    public reject(request: Request): Observable<Request> {
        return this.http.post<IRequest>(`https://smarthard.net/api/requests/${request.id}/reject`, {})
            .pipe(
                map((approvedRequest) => ShikiRequestsService._createRequest(approvedRequest))
            );
    }

    public revert(request: Request): Observable<Request> {
        return this.http.post<IRequest>(`https://smarthard.net/api/requests/${request.id}/revert`, {})
            .pipe(
                map((approvedRequest) => ShikiRequestsService._createRequest(approvedRequest))
            );
    }
}
