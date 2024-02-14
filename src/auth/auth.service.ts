import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { InjectRepository } from '@nestjs/typeorm'
import { compare, genSalt, hash } from 'bcryptjs'

import { AuthDto } from 'src/shared/dto/auth.dto'
import { IJWTObject } from 'src/shared/types/props'
import { User } from 'src/typeorm/entities/User'
import { filterUserFields } from 'src/utils/filterUserFields'
import { Repository } from 'typeorm'
import { UpdateJWTTokens } from './dto/jwtUpdate.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async validateUser(authDto: AuthDto) {
    const user = await this.userRepository.findOne({ where: { username: authDto.username } })
    if (!user) throw new NotFoundException(`User ${authDto.username} is not found.`)

    const isValidPassword = await compare(authDto.password, user.password)
    if (!isValidPassword) throw new UnauthorizedException('Invalid password')

    return user
  }

  async issueTokenPair(data: IJWTObject) {
    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '15d',
    })

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1h',
    })

    return { refreshToken, accessToken }
  }

  async login(authDto: AuthDto) {
    const user = await this.validateUser(authDto)
    const tokens = await this.issueTokenPair({ id: user.id, username: user.username })

    return {
      user: filterUserFields(user),
      ...tokens,
    }
  }

  async register(authDto: AuthDto) {
    const existingUser = await this.userRepository.findOne({ where: { username: authDto.username } })
    if (existingUser) throw new ConflictException(`User with ${authDto.username} is esists.`)

    const salt = await genSalt(10)
    const hashedPassword = await hash(authDto.password, salt)

    const user = this.userRepository.create({
      ...authDto,
      password: hashedPassword,
      createdAt: new Date(),
    })

    await this.userRepository.save(user)

    const tokens = await this.issueTokenPair({ id: user.id, username: user.username })

    return {
      user: filterUserFields(user),
      ...tokens,
    }
  }

  async getNewTokens({ refreshToken }: UpdateJWTTokens) {
    try {
      if (!refreshToken) throw new UnauthorizedException('Please sign in.')

      const tokenData = await this.jwtService.verifyAsync(refreshToken)
      if (!tokenData) throw new UnauthorizedException('Invalid token or expired.')

      const tokens = await this.issueTokenPair({ id: tokenData.id, username: tokenData.username })

      return { accessToken: tokens.accessToken, refreshToken }
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Please sign in.')
    }
  }
}
