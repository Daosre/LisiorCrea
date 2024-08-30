import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        lastName: true,
        firstName: true,
        email: true,
        isActive: true,
      },
    });
  }

  async deleteUser(id: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingUser || !existingUser.id) {
      throw new ForbiddenException('Not existing id');
    }

    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
    return { message: 'Suppression faite' };
  }

  async resetPassword(email: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      const token= this.passwordToken
      await this.emailService.sendUserResetPassword(existingUser, token )
    } else {
      throw new BadRequestException('Email non enregistré')
    }

    return {message: 'Email send'}
  }

  async passwordToken(userId: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
    };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
}
