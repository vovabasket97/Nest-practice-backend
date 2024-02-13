import { AuthDto } from '../dto/auth.dto'

export type UserIdType = number

export interface IJWTObject extends Pick<AuthDto, 'username'> {
  id: UserIdType
}
