import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  icon: string;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  isRequired?: boolean;
} 