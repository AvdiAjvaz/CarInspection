import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDamageDto {
  @IsNumber()
  carId: number;

  @IsNumber()
  x: number;

  @IsNumber()
  y: number;

  @IsString()
  @IsNotEmpty()
  pershkrimi: string;

  @IsString()
  view: string; // ✅ opsionale

  @IsBoolean()
  status: boolean; // ✅ opsionale

  @IsString()
  shkalla_e_demtimit: string; // ✅ opsionale, do të vendoset automatikisht në server

  @IsString()
  dataERegjistrimit?: string; // ✅ opsionale, do të vendoset automatikisht në server
}
