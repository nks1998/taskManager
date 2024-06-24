import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from './datasource/typeorm.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule, TasksModule, UserModule],
})
export class AppModule {}
