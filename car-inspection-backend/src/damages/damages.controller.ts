import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { DamagesService } from './damages.service';
import { CreateDamageDto } from './dto/create-damage.dto';
import { UpdateDamageDto } from './dto/update-damage.dto';

@Controller('damages')
export class DamagesController {
  constructor(private readonly damagesService: DamagesService) {}

  @Post()
  create(@Body() dto: CreateDamageDto) {
    return this.damagesService.create(dto);
  }

  @Get()
  findAll() {
    return this.damagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.damagesService.findOne(id);
  }

  @Get('/car/:carId')
  findByCar(@Param('carId', ParseIntPipe) carId: number) {
    return this.damagesService.findByCar(carId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDamageDto) {
    return this.damagesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.damagesService.remove(id);
  }
}
