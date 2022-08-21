import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  @ApiProperty({ description: 'The name of a coffee.' })
  readonly title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The description of a coffee.' })
  readonly description: string;

  @IsString()
  @ApiProperty({ description: 'The brand of a coffee.' })
  readonly brand: string;

  @IsString({ each: true })
  @ApiProperty({ description: 'The flavros of a coffee.', example: [] })
  readonly flavors: string[];
}
