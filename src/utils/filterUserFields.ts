import { User } from 'src/typeorm/entities/User'

export const filterUserFields = (user: User) => {
  delete user.password
  delete user.createdAt
  delete user.authStrategy

  return user
}
