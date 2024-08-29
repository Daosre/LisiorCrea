import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { disableDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
    return {message: "Suppression faite"}
  }

  
  
}
