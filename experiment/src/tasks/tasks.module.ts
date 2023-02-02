import {
  customTaskRepositoryMethods,
} from './tasks.repository';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';

let customTaskRepoConfig = {
  provide: getRepositoryToken(Task),
  inject: [getDataSourceToken()],
  useFactory(dataSource: DataSource) {
    // Override default repository for Task with a custom one
    return dataSource.getRepository(Task).extend(customTaskRepositoryMethods);
  },
};

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [customTaskRepoConfig, TasksService],
})
export class TasksModule {}
