import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getAllUser')
  getAllUser() {
    return this.userService.getAllUsers();
  }

  @Delete('/delete/:id')
  deleteProduct(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
