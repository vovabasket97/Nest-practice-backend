import { UseGuards, applyDecorators } from '@nestjs/common'
import { UserRoleType } from 'src/shared/types/props'
import { AdminGuard } from '../guards/admin.guard'
import { AuthGuard } from '../guards/auth.guard'

export const Auth = (role: UserRoleType = 'user') =>
  applyDecorators(role === 'admin' ? UseGuards(AdminGuard, AuthGuard) : UseGuards(AuthGuard))
