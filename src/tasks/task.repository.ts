// tasks.repository.ts
import { EntityRepository } from "typeorm";
import { Task } from "./tasks.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/createTask.dto";
import { TaskStatus } from "./taskStatus.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  // Add custom methods here

  // public async createTasks(createTaskDto: CreateTaskDto): Promise<Task> {
    
  // }
}