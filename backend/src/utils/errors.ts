//Add more errors
//DB errors, validation errors etc.

export class NotFoundError {
    error:string;
    status:number;
    message:string;

    constructor(message:string = "Page or resource could not be found") {
        this.error = "NotFoundError"
        this.status = 404;
        this.message = message;
    }
}


export class NotAuthError {
    error:string;
    status:number;
    message:string;

    constructor(message:string = "Not authenticated") {
        this.error = "NotAuthError";
        this.status = 401;
        this.message = message;
    }
}
