import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class AuthDto {
  @IsEmail(
    {},
    {
      message: 'Type should be email.',
    }
  )
  username: string

  @MinLength(6, {
    message: 'Password cannot be less than 6 symbols.',
  })
  @IsString()
  password: string

  @IsOptional()
  @IsBoolean()
  isAdmin: boolean
}
