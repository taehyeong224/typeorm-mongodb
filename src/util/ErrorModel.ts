export class ErrorModel {
    private _status: number;
    private _code: string;
    private _category: string;
    private _message: string;


    constructor(status: number, code: string, category: string, message: string) {
        this._status = status;
        this._code = code;
        this._category = category;
        this._message = message;
    }

    get status () {
        return this._status;
    }

    get code(): string {
        return this._code;
    }

    get category(): string {
        return this._category;
    }

    get message(): string {
        return this._message;
    }
}