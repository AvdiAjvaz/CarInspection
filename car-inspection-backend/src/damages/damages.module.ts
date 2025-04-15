import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DamagesController } from './damages.controller';
import { DamagesService } from './damages.service';
import { Damage } from './damage.entity';
import { Car } from '../cars/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Damage, Car])],
  controllers: [DamagesController],
  providers: [DamagesService],
})
export class DamagesModule {}
