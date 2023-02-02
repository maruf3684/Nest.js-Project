import { TaskStatus } from './task-status.enum';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

export interface TaskRepository extends Repository<Task> {
  this: Repository<Task>;
  createTask(createTaskDto: CreateTaskDto): Promise<Task>;
  getTask(getTaskDto: GetTasksFilterDto): Promise<Task[]>;
}

export const customTaskRepositoryMethods:Pick<TaskRepository,'createTask'|'getTask'> = {
   async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);

    return task;
  },

  async getTask(getTaskDto: GetTasksFilterDto): Promise<Task[]> {
    const {status,search}=getTaskDto;
    const query = this.createQueryBuilder('task');
   

    if(status){
       query.andWhere('task.status = :status',{status:status})
    }
    if(search){
       query.andWhere('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',{search:`%${search}%`})
    }
    const tasks = await query.getMany();
    return tasks;
  }
};




