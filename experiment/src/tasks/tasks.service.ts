import { Customer } from 'src/auth/customer.entity';
import { TaskRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';

/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async getTaskById(id: string,user:Customer): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: {
        id: id,
        customer:user
      },
    });

    if (!found) {
      throw new NotFoundException(`Task with ${id} not found.`);
    }

    return found;
  }

  public async createTask(createTaskDto: CreateTaskDto,user:Customer): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto,user);
  }

  public async deleteTask(id: string,user:Customer): Promise<void> {
    const result = await this.taskRepository.delete({id:id,customer:user});
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id} not found"`);
    }
  }

  public async updateTaskStatus(id: string, status: TaskStatus , user:Customer): Promise<Task> {
    const task = await this.getTaskById(id,user);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  public async getTasks(filterDto: GetTasksFilterDto,user:Customer): Promise<Task[]> {
    return this.taskRepository.getTask(filterDto,user);
  }
}
