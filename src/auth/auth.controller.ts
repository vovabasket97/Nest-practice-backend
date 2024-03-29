import { Controller, Post, Body, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from 'src/shared/dto/auth.dto'
import { UpdateJWTTokens } from './dto/jwtUpdate.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('update')
  getNewTokens(@Body() refreshDto: UpdateJWTTokens) {
    return this.authService.getNewTokens(refreshDto)
  }
}
