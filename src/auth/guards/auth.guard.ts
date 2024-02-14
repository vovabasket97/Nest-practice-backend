import { AuthGuard as Guard } from '@nestjs/passport'

export class AuthGuard extends Guard('jwt') {}
