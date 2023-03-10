import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller';
import { TypeOrmConfigService } from './shared/typeorm.service';
import { UserModule } from './user/user.module';
import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

let Config_Env: DynamicModule = ConfigModule.forRoot({
  isGlobal: true,
});

let Load_TypeOrm: DynamicModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
});

@Module({
  imports: [Config_Env, Load_TypeOrm, UserModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
