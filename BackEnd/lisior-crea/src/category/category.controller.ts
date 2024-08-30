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
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';
import { JwtGuard } from 'src/auth/Guards';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  
  @Get('/allCategory')
  getAllCategory() {
    return this.categoryService.getAllCategory();
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Post('/newCategory')
  insertNewCategory(@Body() dto: CategoryDto) {
    return this.categoryService.insertNewCategory(dto);
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Patch('/editCategory/:id')
  updateCategory(@Body() dto: CategoryDto, @Param('id') id: string) {
    return this.categoryService.editCategory(id, dto);
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Delete('/delete/:id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }

  
  @Get('/:id')
  getCategoryById(@Param('id') id: string) {
    return this.categoryService.getCategoryById(id);
  }
}
