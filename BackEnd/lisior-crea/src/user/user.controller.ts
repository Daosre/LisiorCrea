import { Body, Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AdminGuard } from 'src/auth/Guards/admin.guard';
import { JwtGuard } from 'src/auth/Guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard, AdminGuard)
  @Get('/getAllUser')
  getAllUser() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Delete('/delete/:id')
  deleteProduct(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Get('/reset')
  resetPassword(@Body("email") email: string){
    return this.userService.resetPassword(email)
  }



}
