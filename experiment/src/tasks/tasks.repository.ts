import { TaskStatus } from './task-status.enum';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';


export class TaskRepository extends Repository<Task> {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {
    super(
      taskRepository.target,
      taskRepository.manager,
      taskRepository.queryRunner,
    );
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);

    return task;
  }
  async getTask(createTaskDto: GetTasksFilterDto): Promise<Task[]> {
    const {status,search}=createTaskDto;
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
}

