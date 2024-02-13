import { Injectable } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { UserIdType } from 'src/shared/types/props'

@Injectable()
export class TasksService {
  create(createTaskDto: CreateTaskDto) {
    console.log({ createTaskDto })
    return 'This action adds a new task'
  }

  findAll() {
    return `This action returns all tasks`
  }

  findOne(id: UserIdType) {
    return `This action returns a #${id} task`
  }

  update(id: UserIdType, updateTaskDto: UpdateTaskDto) {
    console.log({ updateTaskDto })
    return `This action updates a #${id} task`
  }

  remove(id: UserIdType) {
    return `This action removes a #${id} task`
  }
}
