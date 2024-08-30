import { BadRequestException, Injectable } from '@nestjs/common';
import { isString } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResetPasswordService {
  constructor(private prisma: PrismaService) {}

  async resetToken(token: string, res: any) {
    if (!token || !isString(token)) {
      throw new BadRequestException('Need a valid token');
    }

    const user = await this.prisma.user.findFirst({
      where: {
        token: token,
      },
    });

    if (!user || !user.id) {
      throw new BadRequestException('Not a valid token');
    }

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: null,
        password: user.password
      },
    });

    return [
      'account activate',
      res.redirect('http://localhost:3001/reset-password'),
    ];
  }
}
