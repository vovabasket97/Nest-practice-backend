import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'

import { ExtractJwt, Strategy } from 'passport-jwt'
import { IJWTObject } from 'src/shared/types/props'
import { User } from 'src/typeorm/entities/User'
import { Repository } from 'typeorm'

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }

  async validate({ id, username }: IJWTObject): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username, id } })
    if (!user) throw new UnauthorizedException()

    return user
  }
}
