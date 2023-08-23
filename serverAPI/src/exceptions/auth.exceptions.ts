import { BaseException } from './base.exceptions';
import { HttpStatus } from '@nestjs/common';

export class UserUnauthorizedException extends BaseException {
    constructor(msg: string) {
        super(msg, HttpStatus.UNAUTHORIZED);
    }
}

export class VerifyTokenNotValidException extends BaseException {
    constructor(msg?: string) {
        super(msg ? msg : `Verify token not valid`, HttpStatus.BAD_REQUEST);
    }
}

export class ChainIDInvalid extends BaseException {
    constructor(msg?: string) {
        super(msg ? msg : `ChainId when auth invalid`, HttpStatus.BAD_REQUEST);
    }
}

export class NotAdmin extends BaseException {
    constructor(msg?: string) {
        super(msg ? msg : `user not admin`, HttpStatus.BAD_REQUEST);
    }
}

export class YetActiveUser extends BaseException {
    constructor(msg?: string) {
        super(msg ? msg : `user not admin`, HttpStatus.BAD_REQUEST);
    }
}

export class ExpriedToken extends BaseException {
    constructor(msg?: string) {
        super(msg ? msg : `user not admin`, HttpStatus.BAD_REQUEST);
    }
}
