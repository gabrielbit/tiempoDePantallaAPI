import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChildDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  age: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  screenTimeLimit?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  screenTimeUsed?: number;
} 