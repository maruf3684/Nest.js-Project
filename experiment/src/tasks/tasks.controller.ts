import { Customer } from 'src/auth/customer.entity';
import { AuthGuard } from '@nestjs/passport';
import { Task } from './task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';


/*
https://docs.nestjs.com/controllers#controllers
*/
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController')
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto,@GetUser()user:Customer): Promise<Task[]> {
    this.logger.verbose(`User ${user.username} retriving all task`) //logging
    return this.tasksService.getTasks(filterDto,user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string,@GetUser()user:Customer): Promise<Task> {
    return this.tasksService.getTaskById(id,user);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser()user:Customer): Promise<Task> {
    return this.tasksService.createTask(createTaskDto,user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string,@GetUser()user:Customer): Promise<void> {
    return this.tasksService.deleteTask(id,user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser()user:Customer
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status,user);
  }
}
