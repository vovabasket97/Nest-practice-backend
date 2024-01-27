import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserParams, UpdateUserParams } from 'src/shared/types/props'
import { User } from 'src/typeorm/entities/User'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  getUsers() {
    return this.userRepository.find()
  }

  findUser(id: number) {
    return this.userRepository.findOne({ where: { id } })
  }

  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, updateUserDetails)
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id })
  }

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    })
    return this.userRepository.save(newUser)
  }
}
