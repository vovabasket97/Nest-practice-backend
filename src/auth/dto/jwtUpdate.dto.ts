import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateJWTTokens {
  @IsString({
    message: 'You did not pass refresh token or it is not a string!',
  })
  @IsNotEmpty({
    message: "Token can't be empty",
  })
  refreshToken: string
}
