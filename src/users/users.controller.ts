import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './users.model'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers() {
    return this.userService.getUsers()
  }

  @Get(':id')
  findUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUser(id)
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto)
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto)
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id)
  }
}
