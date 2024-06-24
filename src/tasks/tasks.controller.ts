import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTaskFilterDto } from './dto/getTaskFilter.dto';
import { TaskStatusValidate } from './pipes/taskStatusValidation.pipe';
import { Task } from './tasks.entity';
import { TaskStatus } from './taskStatus.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/getUser.decorator';
import { User } from 'src/user/user.entity';
import { JwtAuthGuard } from 'src/user/jwtAuth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(
    @GetUser() user: User,
    @Query(ValidationPipe) getTaskFilterDto: GetTaskFilterDto,
  ) {
    this.logger.verbose(`User ${user.username} is retrieving all tasks.`)
    return this.taskService.getAllTasks(user);
  }

  @Get('/:id')
  getTaskById(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Delete('/:id')
  deleteTask(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidate) status: TaskStatus,
  ): Promise<Task | null> {
    return this.taskService.updateTaskStatus(id, status, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @GetUser() user: User,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }
}
