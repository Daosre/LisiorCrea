import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { disableDto, updateUsersDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  getAllProducts() {
    return this.userService.getAllUsers()
  }

  @Patch("/updateAdmin/:id")
  updateAdmin(@Param("id") id : string, @Body() dto: disableDto) {
    return this.userService.updateAdmin(id, dto)
  }

  @Patch("/updateUser/:id")
  updateProduct(@Param("id") id: string, @Body() dto: updateUsersDto) {
    return this.userService.updateUser(id, dto)
  }

  @Delete("/delete/:id")
  deleteProduct(@Param("id") id: string) {
    return this.userService.deleteUser
  }
}
