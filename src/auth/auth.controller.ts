import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from 'src/shared/dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('/register')
  register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto)
  }

  @UsePipes(new ValidationPipe())
  @Post('/login')
  login() {
    return null
  }
}
