import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  async findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by id' })
  async findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Get('schedule/:scheduleId')
  @ApiOperation({ summary: 'Get tasks by schedule id' })
  async findBySchedule(@Param('scheduleId') scheduleId: string) {
    return this.tasksService.findBySchedule(scheduleId);
  }
} 