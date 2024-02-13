import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { compare, genSalt, hash } from 'bcryptjs'

import { AuthDto } from 'src/shared/dto/auth.dto'
import { User } from 'src/typeorm/entities/User'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async validateUser(authDto: AuthDto) {
    const user = await this.userRepository.findOne({ where: { username: authDto.username } })
    if (!user) throw new NotFoundException(`User ${authDto.username} is not found.`)

    const isValidPassword = await compare(authDto.password, user.password)
    if (!isValidPassword) throw new UnauthorizedException('Invalid password')

    return user
  }

  async login(authDto: AuthDto) {
    return this.validateUser(authDto)
  }

  async register(authDto: AuthDto) {
    const existingUser = await this.userRepository.findOne({ where: { username: authDto.username } })
    if (existingUser) throw new ConflictException(`User with ${authDto.username} is esists.`)

    const salt = await genSalt(10)
    const hashedPassword = await hash(authDto.password, salt)

    const newUser = this.userRepository.create({
      ...authDto,
      password: hashedPassword,
      createdAt: new Date(),
    })
    return this.userRepository.save(newUser)
  }
}
