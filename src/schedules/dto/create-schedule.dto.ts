import { IsString, IsInt, IsBoolean, IsArray, IsOptional } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  name: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsInt()
  recommendedDuration: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  appliedToAll?: boolean;

  @IsArray()
  @IsString({ each: true })
  childrenIds: string[];

  @IsArray()
  @IsString({ each: true })
  taskIds: string[];
} 