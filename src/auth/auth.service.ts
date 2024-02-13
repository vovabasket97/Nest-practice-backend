import { ConflictException, Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { AuthDto } from 'src/shared/dto/auth.dto'
import { User } from 'src/typeorm/entities/User'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async register(authDto: AuthDto) {
    const existingUser = await this.userRepository.findOne({ where: { username: authDto.username } })
    if (existingUser) throw new ConflictException(`User with ${authDto.username} is esists.`)

    const newUser = this.userRepository.create({
      ...authDto,
      createdAt: new Date(),
    })
    return this.userRepository.save(newUser)
  }
}
