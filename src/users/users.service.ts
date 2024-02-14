import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthDto } from 'src/shared/dto/auth.dto'
import { UserIdType } from 'src/shared/types/props'
import { User } from 'src/typeorm/entities/User'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  getUsers() {
    return this.userRepository.find()
  }

  async findUser(id: UserIdType) {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) throw new NotFoundException(`User with id:${id} is not found.`)

    return user
  }

  async updateUser(id: UserIdType, updateUserDetails: Partial<AuthDto>) {
    try {
      const updateResult = await this.userRepository.update({ id }, updateUserDetails)

      if (updateResult.affected === 0) throw new NotFoundException(`User with id:${id} is not found.`)

      return updateResult
    } catch (error) {
      throw new BadRequestException(error.sqlMessage)
    }
  }

  async deleteUser(id: UserIdType) {
    try {
      const deleteResult = await this.userRepository.delete({ id })

      if (deleteResult.affected === 0) throw new NotFoundException(`User with id:${id} is not found.`)

      return deleteResult
    } catch (error) {
      throw new BadRequestException(error.sqlMessage || error.message)
    }
  }
}
