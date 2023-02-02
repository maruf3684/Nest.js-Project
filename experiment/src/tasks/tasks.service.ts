import { TaskRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';

/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    // @InjectRepository(Task) private readonly taskRepository: TaskRepository,
    private readonly taskRepository: TaskRepository,
  ) {}

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

  // private tasks: Task[] = [];

  // public getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // public getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);

  //   if(!found){
  //     throw new NotFoundException(`Task with ${id} not found.`);
  //   }

  //   return found;
  // }

  // public updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }

  // public getTasksWithFilter(filterDto: GetTasksFilterDto):Task[] {
  //   const {search,status} = filterDto;
  //   let tasks = this.getAllTasks();

  //   if (status){
  //        tasks=tasks.filter((task)=>task.status===status)
  //   }

  //   if(search){
  //     tasks=tasks.filter((task)=>{
  //       if (task.title.includes(search)||task.description.includes(search)){
  //         return true;
  //       }
  //       return false;
  //     })
  //   }

  //   return tasks;
  // }

  // public createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title: title,
  //     description: description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

  // public deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
}
