import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { UsersService } from './users.service'
import { AuthDto } from 'src/shared/dto/auth.dto'
import { UserIdType } from 'src/shared/types/props'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Auth('admin')
  async getUsers() {
    return this.userService.getUsers()
  }

  @Get(':id')
  @Auth('admin')
  findUser(@Param('id', ParseIntPipe) id: UserIdType) {
    return this.userService.findUser(id)
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Auth('admin')
  updateUser(@Param('id', ParseIntPipe) id: UserIdType, @Body() updateUserDto: Partial<AuthDto>) {
    return this.userService.updateUser(id, updateUserDto)
  }

  @Delete(':id')
  @Auth('admin')
  deleteUser(@Param('id', ParseIntPipe) id: UserIdType) {
    return this.userService.deleteUser(id)
  }
}
