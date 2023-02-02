import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {


  @Inject(ConfigService)
  private readonly config: ConfigService;


  public createTypeOrmOptions(): TypeOrmModuleOptions {
    //console.log(this.config.get<string>('DB_HOST'));
    
    return {
      type: 'postgres',
      host: this.config.get<string>('DB_HOST'),
      port: this.config.get<number>('DB_POR'),
      database: this.config.get<string>('DB_NAME'),
      username: this.config.get<string>('DB_USERNAME'),
      password: this.config.get<string>('DB_PASSWORD'),
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/db/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      autoLoadEntities : true,
      logger: 'file',
      //synchronize: true, // never use TRUE in production!
    };
  }



}