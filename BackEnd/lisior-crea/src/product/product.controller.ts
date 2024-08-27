import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { category } from '@prisma/client';
import { productsDto } from './dto';
import { ProductService } from './product.service';
import { CategoryProps } from 'src/utils/type';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/allProducts')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Post('/newProduct')
  createProduct(@Body() dto: productsDto, categoryId: CategoryProps) {
    return this.productService.createProduct(dto, categoryId);
  }

  @Patch('/updateProduct/:id')
  updateProduct(@Param('id') id: string, @Body() dto: productsDto) {
    return this.productService.updateProducts(id, dto);
  }

  @Delete('/deleteProduct/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProducts(id);
  }

  @Get('/GlobalSearch')
  getByGlobalSearch(@Param('name') name: string){
    return this.productService.globalSearch(name)
  }
}
