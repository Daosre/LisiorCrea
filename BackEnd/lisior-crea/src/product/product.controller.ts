import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { category } from '@prisma/client';
import { productsDto } from './dto';
import { ProductService } from './product.service';
import { CategoryProps } from 'src/utils/type';
import { AdminGuard } from 'src/auth/Guards/admin.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/allProducts')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @UseGuards(AdminGuard)
  @Post('/newProduct')
  createProduct(@Body() dto: productsDto, categoryId: CategoryProps) {
    return this.productService.createProduct(dto, categoryId);
  }

  @UseGuards(AdminGuard)
  @Patch('/updateProduct/:id')
  updateProduct(@Param('id') id: string, @Body() dto: productsDto) {
    return this.productService.updateProducts(id, dto);
  }

  @UseGuards(AdminGuard)
  @Delete('/deleteProduct/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProducts(id);
  }

  @Get('/GlobalSearch')
  getByGlobalSearch(@Param('name') name: string){
    return this.productService.globalSearch(name)
  }
}
