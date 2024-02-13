import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { UsersService } from './users.service'
import { AuthDto } from 'src/shared/dto/auth.dto'
import { UserIdType } from 'src/shared/types/props'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers() {
    return this.userService.getUsers()
  }

  @Get(':id')
  findUser(@Param('id', ParseIntPipe) id: UserIdType) {
    return this.userService.findUser(id)
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: UserIdType, @Body() updateUserDto: AuthDto) {
    return this.userService.updateUser(id, updateUserDto)
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: UserIdType) {
    return this.userService.deleteUser(id)
  }
}
