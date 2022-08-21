import { IsOptional, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly descriptiom: string;

  @IsString()
  readonly brand: string;

  @IsString({ each: true })
  readonly flavors: string[];
}
