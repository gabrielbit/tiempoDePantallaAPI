import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChildDto } from './dto/create-child.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChildrenService {
  private readonly logger = new Logger(ChildrenService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    this.logger.log(`Finding all children for user ${userId}`);
    try {
      const children = await this.prisma.child.findMany({
        where: {
          parentId: userId,
        },
        select: {
          id: true,
          name: true,
          age: true,
          screenTimeLimit: true,
          screenTimeUsed: true,
        },
      });
      this.logger.log(`Found ${children.length} children`);
      return children;
    } catch (error) {
      this.logger.error('Error finding children:', error);
      throw error;
    }
  }

  async create(data: CreateChildDto, userId: string) {
    this.logger.log(`Creating child for user ${userId}:`, data);
    try {
      const createData: Prisma.ChildCreateInput = {
        name: data.name,
        age: data.age,
        screenTimeLimit: data.screenTimeLimit || 0,
        screenTimeUsed: data.screenTimeUsed || 0,
        parent: {
          connect: { id: userId }
        }
      };

      const child = await this.prisma.child.create({
        data: createData
      });
      
      this.logger.log('Child created successfully:', child.id);
      return child;
    } catch (error) {
      this.logger.error('Error creating child:', error);
      throw error;
    }
  }
} 