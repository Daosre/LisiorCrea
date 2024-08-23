import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { disableDto, updateUsersDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService
) { }

async getAllUsers() {
  return this.prisma.user.findMany({
      orderBy: {
          createdAt: 'desc'
      },
      select: {
          firstName: true,
          email: true,
      }
  })
}

async updateUser(id: string, dto: updateUsersDto) {
  const existingUser = await this.prisma.user.findUnique({
      where: {
          id: id
      }
  })

  if (!existingUser || !existingUser.id) {
      throw new ForbiddenException("Not existing id")
  }


  const UpdatedUser = await this.prisma.user.update({
      where: {
          id: id,
      },
      data: {
          ...dto
      }
  })

  delete UpdatedUser.password

  return UpdatedUser
}



async deleteUser(id: string) {
  const existingUser = await this.prisma.user.findUnique({
      where: {
          id: id
      }
  })

  if (!existingUser || !existingUser.id) {
      throw new ForbiddenException("Not existing id")
  }

  return this.prisma.user.delete({
      where: {
          id: id
      }
  })
}

async updateAdmin(id: string, dto: disableDto){
  const existingUser = await this.prisma.user.findUnique({
      where: {
          id: id
      }
  })

  if ( !existingUser || !existingUser.id){
      throw new ForbiddenException("Not existing id")
  }

  await this.prisma.user.update({
      where: {
          id: id,
      },
      data: {
          isActive: dto.isActive,
      },
  });
  return 'Update registered'
}
}
