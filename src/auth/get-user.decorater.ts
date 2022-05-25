import { createParamDecorator } from '@nestjs/common';
import { User } from './model/auth.entity';

export const GetUser = createParamDecorator((data, req) => {
  return req.user;
});
