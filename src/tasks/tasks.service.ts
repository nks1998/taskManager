import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTaskFilterDto } from './dto/getTaskFilter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { TaskStatus } from './taskStatus.enum';
import { User } from 'src/user/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TaskRepository,
  ) {}

  async getAllTasks(user: User) {
    return this.taskRepository.findAndCount({where: {userId: user.id }});
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, userId: user.id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async deleteTask(id: number, user: User) {
    return await this.taskRepository.delete({ id, userId: user.id });
  }

  async updateTaskStatus(
    id: number,
    newStatus: TaskStatus,
    user: User
  ): Promise<Task | null> {
    const task = await this.taskRepository.findOneBy({ id, userId: user.id });
    if (task) {
      task.status = newStatus;
      await task.save();
      return task;
    } else {
      return null;
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task()
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();
    delete task.user

    return task;
  }
}
