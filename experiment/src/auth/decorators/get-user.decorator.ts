import { Customer } from './../customer.entity';
import { createParamDecorator , ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator((_data,ctx:ExecutionContext):Customer=>{
    const req = ctx.switchToHttp().getRequest();
    return req.user;
})