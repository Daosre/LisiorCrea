import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/allCategories')
  getAllCategory() {
    return this.categoryService.getAllCategory()
  }

  @Post("/newCategory")
  insertNewCategory(@Body() dto: CategoryDto){
    return this.categoryService.insertNewCategory(dto)
  }

  @Patch("/editCategory/:id")
  updateCategory(@Body() dto: CategoryDto, @Param("id") id: string){
    return this.categoryService.editCategory(id, dto)
  }

  @Delete("/delete/:id")
  deleteCategory(@Param("id") id: string){
    return this.categoryService.deleteCategory(id)
  }

}
