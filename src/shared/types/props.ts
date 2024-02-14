import { AuthDto } from '../dto/auth.dto'

export type UserIdType = number

export type UserRoleType = 'admin' | 'user'

export interface IJWTObject extends Pick<AuthDto, 'username' | 'isAdmin'> {
  id: UserIdType
}
