import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  lloji: string;

  @IsNotEmpty()
  @IsString()
  ngjyra: string;

  @IsNotEmpty()
  @IsString()
  nr_targave: string;

  @IsNotEmpty()
  @IsNumber()
  clientId: number;
}
