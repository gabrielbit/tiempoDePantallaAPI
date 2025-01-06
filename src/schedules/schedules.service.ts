import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const { childrenIds, taskIds, ...scheduleData } = createScheduleDto;

    const data: Prisma.ScheduleCreateInput = {
      ...scheduleData,
      children: childrenIds ? {
        create: childrenIds.map(childId => ({
          child: { connect: { id: childId } }
        }))
      } : undefined,
      tasks: taskIds ? {
        create: taskIds.map(taskId => ({
          task: { connect: { id: taskId } }
        }))
      } : undefined
    };

    return this.prisma.schedule.create({
      data,
      include: {
        children: {
          include: {
            child: true
          }
        },
        tasks: {
          include: {
            task: true
          }
        }
      }
    });
  }

  async generateDailyInstances(date: Date) {
    // Obtener todos los horarios activos con sus tareas y niños
    const activeSchedules = await this.prisma.schedule.findMany({
      where: { isActive: true },
      include: {
        children: true,
        tasks: true // Incluir las tareas
      }
    });

    // Crear instancias para cada horario y niño
    for (const schedule of activeSchedules) {
      for (const childSchedule of schedule.children) {
        await this.prisma.scheduleInstance.create({
          data: {
            date,
            schedule: { connect: { id: schedule.id } },
            child: { connect: { id: childSchedule.childId } },
            taskStates: {
              create: schedule.tasks.map(taskSchedule => ({
                task: { connect: { id: taskSchedule.taskId } }
              }))
            }
          }
        });
      }
    }
  }

  async findAll() {
    try {
      console.log('Finding all schedules...');
      const schedules = await this.prisma.schedule.findMany({
        include: {
          tasks: {
            include: {
              task: true
            }
          },
          children: {
            include: {
              child: true
            }
          }
        }
      });
      console.log('Found schedules:', JSON.stringify(schedules, null, 2));
      return schedules;
    } catch (error) {
      console.error('Error finding schedules:', error);
      throw error;
    }
  }

  async findOne(id: string) {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id },
      include: {
        children: {
          include: {
            child: true
          }
        },
        tasks: {
          include: {
            task: true
          }
        },
        instances: {
          include: {
            taskStates: true
          }
        }
      }
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }

    return schedule;
  }

  async findByChild(childId: string) {
    return this.prisma.schedule.findMany({
      where: {
        children: {
          some: {
            childId
          }
        }
      },
      include: {
        children: {
          include: {
            child: true
          }
        },
        tasks: {
          include: {
            task: true
          }
        },
        instances: {
          where: {
            childId
          },
          include: {
            taskStates: true
          }
        }
      }
    });
  }
} 