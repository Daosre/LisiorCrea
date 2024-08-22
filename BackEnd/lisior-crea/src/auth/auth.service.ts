import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { role } from 'src/utils/const';
import { SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signToken(userId: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
    };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30d',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }

  async signup(dto: SignUpDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (existingUser) {
      throw new ForbiddenException('Email already taken');
    }
    const userRole = await this.prisma.role.findUnique({
      where: {
        name: role.USER,
      },
    });

    if (!userRole) {
      throw new NotFoundException('Not Found');
    }

    const hash = await argon.hash(dto.password);

    // const activationToken = await argon.hash(`${new Date()} + ${dto.email}`);
    // const newToken = activationToken.replaceAll('/', '');

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        password: hash,
        roleId: userRole.id,
        // token: newToken,
      },
    });

    return { message: 'Register Successful' };
  }
}
