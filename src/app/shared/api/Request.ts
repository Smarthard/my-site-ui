export interface IRequest {
    id: number;
    type: string;
    target_id: number;
    requester: string;
    comment: string;
    request: any;
    old: any;
    approved: boolean;
    reviewer_id: number;
    reviewed: string;
    feedback: string;
    createdAt: string;
}

export class Request {
    id: number;
    type: string;
    targetId: number;
    requester: string;
    comment: string;
    request: any;
    old: any;
    approved: boolean;
    reviewerId: number;
    feedback: string;
    readonly reviewed?: Date;
    readonly createdAt: Date;

    constructor(
        id: number,
        type: string,
        targetId: number,
        requester: string,
        comment: string,
        request: any,
        old: any,
        approved: boolean,
        reviewerId: number,
        reviewed: string,
        feedback: string,
        createdAt: string,
    ) {
        this.id = id;
        this.type = type;
        this.targetId = targetId;
        this.requester = requester;
        this.comment = comment;
        this.request = request;
        this.old = old;
        this.approved = approved;
        this.reviewerId = reviewerId;
        this.reviewed = !reviewed ? null : new Date(!reviewed ? null : createdAt);
        this.feedback = feedback;
        this.createdAt = new Date(!createdAt ? null : createdAt);
    }
}
