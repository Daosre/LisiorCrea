import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/SignUp')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post('/SignIn')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }
}
