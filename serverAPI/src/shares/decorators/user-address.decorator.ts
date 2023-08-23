import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserUnauthorizedException } from '../../exceptions/auth.exceptions';
export const UserAddress = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        console.log(request.user.address, 'this is in user addres decorator');
        return request.user.address;
    },
);
