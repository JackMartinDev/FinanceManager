//Add more errors
//DB errors, validation errors etc.

export class NotFoundError {
    message:string;
    status:number;

    constructor(message:string) {
        this.message = message;
        this.status = 404;
    }
}

export class NotAuthError {
    message:string;
    status:number;

    constructor(message:string = "Not authenticated") {
        this.message = message;
        this.status = 401;
    }
}
