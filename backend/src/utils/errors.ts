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

export class EmailInUseError {
    error:string;
    status:number;
    message:string;

    constructor(message:string = "Email is in use") {
        this.error = "EmailInUseError";
        this.status = 409;
        this.message = message;
    }
}

export class FailedLoginError {
    error:string;
    status:number;
    message:string;

    constructor(message:string = "Failed to login") {
        this.error = "FailedLoginError";
        this.status = 401;
        this.message = message;
    }
}

