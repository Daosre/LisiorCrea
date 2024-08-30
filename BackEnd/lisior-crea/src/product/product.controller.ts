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

import { AdminGuard } from 'src/auth/Guards/admin.guard';
import { CategoryProps } from 'src/utils/type';
import { productsDto } from './dto';
import { ProductService } from './product.service';
import { JwtGuard } from 'src/auth/Guards';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  
  @Get('/allProducts')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Post('/newProduct')
  createProduct(@Body() dto: productsDto) {
    return this.productService.createProduct(dto);
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Patch('/updateProduct/:id')
  updateProduct(@Param('id') id: string, @Body() dto: productsDto) {
    return this.productService.updateProducts(id, dto);
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Delete('/deleteProduct/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProducts(id);
  }

  
  @Get('/GlobalSearch')
  getByGlobalSearch(@Param('name') name: string) {
    return this.productService.globalSearch(name);
  }
}
