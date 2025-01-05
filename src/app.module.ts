import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SchedulesModule } from './schedules/schedules.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    SchedulesModule,
    AuthModule
  ],
})
export class AppModule {}
