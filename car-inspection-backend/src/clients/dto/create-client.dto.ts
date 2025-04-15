import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  emri: string;

  @IsNotEmpty()
  @IsString()
  mbiemri: string;

  @IsNotEmpty()
  @Matches(/^\+?\d{8,15}$/)
  numri_i_telefonit: string;
}
