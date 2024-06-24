// tasks.repository.ts
import { EntityRepository } from "typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Add custom methods here

  // public async createTasks(createTaskDto: CreateTaskDto): Promise<Task> {
    
  // }
}