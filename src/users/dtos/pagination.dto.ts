import { IsNumber, IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsEmpty()
  page: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsEmpty()
  limit: number;
}
