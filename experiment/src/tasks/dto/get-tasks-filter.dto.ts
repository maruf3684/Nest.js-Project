import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE]) //or @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  search: string;
}
