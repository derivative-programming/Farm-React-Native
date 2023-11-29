export interface InitRequest {
}
export interface InitResult {

    success: boolean;
    message: string;
    validationErrors: InitValidationError[];
}
export interface InitValidationError {
    property: string;
    message: string;
}
export class InitResultInstance implements InitResult {

    success: boolean;
    message: string;
    validationErrors: InitValidationError[];
    constructor() {

        this.success = false;
        this.message = '';
        this.validationErrors =  [];
    }
}
export class InitValidationErrorInstance implements InitValidationError {
    property: string;
    message: string;
    constructor() {
        this.property = '';
        this.message = '';
    }
}

