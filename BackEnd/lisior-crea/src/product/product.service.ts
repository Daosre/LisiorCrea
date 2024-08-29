import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryProps } from 'src/utils/type';
import { productsDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts() {
    return this.prisma.product.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        name: true,
        description: true,
        price: true,
        image: true,
      },
    });
  }

  async globalSearch(query: string) {
    return this.prisma.product.findMany({
      where: {
        name: query,
      },
    });
  }

  async createProduct(dto: productsDto, category: CategoryProps) {
    await this.prisma.product.create({
      data: {
        name: dto.name,
        price: dto.price,
        description: dto.description,
        categoryId: category.id,
        image: dto.image,
      },
    });
  }

  async updateProducts(id: string, dto: productsDto) {
    const existingProduct = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingProduct || !existingProduct.id) {
      throw new ForbiddenException('Not existing id');
    }

    return this.prisma.product.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteProducts(id: string) {
    const existingProduct = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingProduct || !existingProduct.id) {
      throw new ForbiddenException("Id doesn't exist");
    } else {
      await this.prisma.product.delete({
        where: {
          id: id,
        },
      });

      return 'deleted';
    }
  }
}
