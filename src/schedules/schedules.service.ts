import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const { childrenIds, taskIds, ...scheduleData } = createScheduleDto;

    return this.prisma.schedule.create({
      data: {
        ...scheduleData,
        children: {
          create: childrenIds.map(childId => ({
            child: {
              connect: { id: childId }
            }
          }))
        },
        tasks: {
          create: taskIds.map(taskId => ({
            task: {
              connect: { id: taskId }
            }
          }))
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
    return this.prisma.schedule.findMany({
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