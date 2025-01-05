import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@ApiTags('schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new schedule' })
  @ApiResponse({ status: 201, description: 'Schedule created successfully' })
  async create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Post('generate-instances')
  @ApiOperation({ summary: 'Generate daily instances for all active schedules' })
  @ApiResponse({ status: 201, description: 'Daily instances generated successfully' })
  async generateDailyInstances(@Query('date') date: string) {
    return this.schedulesService.generateDailyInstances(new Date(date));
  }

  @Get()
  @ApiOperation({ summary: 'Get all schedules' })
  async findAll() {
    return this.schedulesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get schedule by id' })
  async findOne(@Param('id') id: string) {
    return this.schedulesService.findOne(id);
  }

  @Get('child/:childId')
  @ApiOperation({ summary: 'Get schedules by child id' })
  async findByChild(@Param('childId') childId: string) {
    return this.schedulesService.findByChild(childId);
  }
} 