import { Controller, Param, Post, Res } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post('/:token')
  activateAccount(@Param('token') token: string, @Res() res: any) {
    return this.resetPasswordService.resetToken(token, res);
  }
}
