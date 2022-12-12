import { RegisterInput } from './dtos/register.dto';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('admin/register')
  register(@Body() body: RegisterInput) {
    return body;
  }
}
