import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  imports: [
    PrismaModule,
    SchedulesModule
  ],
})
export class AppModule {}
