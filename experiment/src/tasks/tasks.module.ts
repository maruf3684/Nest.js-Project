import { AuthModule } from './../auth/auth.module';
import { TaskRepository } from './tasks.repository';
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

@Module({
  imports: [TypeOrmModule.forFeature([Task]),AuthModule],
  controllers: [TasksController],
  providers: [TaskRepository, TasksService],
  exports:[TaskRepository]
})
export class TasksModule {}
