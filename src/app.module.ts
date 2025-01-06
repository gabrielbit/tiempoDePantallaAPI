import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SchedulesModule } from './schedules/schedules.module';
import { TasksModule } from './tasks/tasks.module';
import { ChildrenModule } from './children/children.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    SchedulesModule,
    TasksModule,
    ChildrenModule,
    PrismaModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
