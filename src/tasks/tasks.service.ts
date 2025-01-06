import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  async findAll() {
    return this.prisma.task.findMany({
      include: {
        schedules: {
          include: {
            schedule: true
          }
        }
      }
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        schedules: {
          include: {
            schedule: true
          }
        },
        taskStates: {
          include: {
            scheduleInstance: true
          }
        }
      }
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async findBySchedule(scheduleId: string) {
    return this.prisma.task.findMany({
      where: {
        schedules: {
          some: {
            scheduleId
          }
        }
      },
      include: {
        taskStates: {
          where: {
            scheduleInstance: {
              scheduleId
            }
          },
          include: {
            scheduleInstance: true
          }
        }
      }
    });
  }
} 