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

  public async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!found) {
      throw new NotFoundException(`Task with ${id} not found.`);
    }

    return found;
  }

  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  public async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id} not found"`);
    }
  }

  public async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  public async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTask(filterDto);
  }
}
