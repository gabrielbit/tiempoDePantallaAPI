import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ChildrenService } from './children.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateChildDto } from './dto/create-child.dto';

@ApiTags('children')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Get()
  @ApiOperation({ summary: 'Get all children for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of children' })
  async findAll(@Request() req) {
    console.log('GET /children called');
    return this.childrenService.findAll(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new child' })
  @ApiResponse({ status: 201, description: 'Child created successfully' })
  async create(@Body() createChildDto: CreateChildDto, @Request() req) {
    console.log('POST /children called with data:', createChildDto);
    return this.childrenService.create(createChildDto, req.user.id);
  }
} 