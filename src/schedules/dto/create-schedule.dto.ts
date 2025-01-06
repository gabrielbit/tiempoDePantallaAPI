import { IsString, IsArray, IsBoolean, IsOptional, IsIn, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Debe coincidir con los íconos del frontend
const VALID_ICONS = [
  'homework',
  'room',
  'gaming',
  'school',
  'reading',
  'sports',
  'music',
  'art',
  'bath',
  'food'
] as const;

type IconType = typeof VALID_ICONS[number];

export class CreateScheduleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  startTime: string;

  @ApiProperty()
  @IsString()
  endTime: string;

  @ApiProperty({ enum: VALID_ICONS })
  @IsString()
  @IsIn(VALID_ICONS)
  icon: IconType;

  @ApiProperty()
  @IsNumber()
  recommendedDuration: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  appliedToAll?: boolean;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsOptional()
  childrenIds?: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsOptional()
  taskIds?: string[];
}

export { VALID_ICONS }; 