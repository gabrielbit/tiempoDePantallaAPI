import { Controller, Post, Body, Get, Param, Query, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto, VALID_ICONS } from './dto/create-schedule.dto';

@ApiTags('schedules')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new schedule' })
  @ApiResponse({ status: 201, description: 'Schedule created successfully' })
  async create(@Body() createScheduleDto: CreateScheduleDto) {
    if (!VALID_ICONS.includes(createScheduleDto.icon as any)) {
      throw new BadRequestException(`Invalid icon type. Must be one of: ${VALID_ICONS.join(', ')}`);
    }
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
    console.log('GET /schedules called');
    const schedules = await this.schedulesService.findAll();
    console.log('Schedules from DB:', JSON.stringify(schedules, null, 2));
    return schedules;
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