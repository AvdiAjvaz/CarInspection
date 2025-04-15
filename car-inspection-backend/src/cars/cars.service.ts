import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Client } from '../clients/client.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carRepo: Repository<Car>,

    @InjectRepository(Client)
    private clientRepo: Repository<Client>,
  ) {}

  async create(data: CreateCarDto) {
    const client = await this.clientRepo.findOne({
      where: { id: data.clientId },
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const car = this.carRepo.create({
      lloji: data.lloji,
      ngjyra: data.ngjyra,
      nr_targave: data.nr_targave,
      klienti: client,
    });

    return this.carRepo.save(car);
  }

  findAll() {
    return this.carRepo.find({ relations: ['klienti'] });
  }

  async findOne(id: number) {
    const car = await this.carRepo.findOne({
      where: { id },
      relations: ['klienti'],
    });
    if (!car) throw new NotFoundException('Car not found');
    return car;
  }

  async update(id: number, data: UpdateCarDto) {
    const car = await this.findOne(id);

    if (data.clientId) {
      const client = await this.clientRepo.findOne({
        where: { id: data.clientId },
      });
      if (!client) throw new NotFoundException('Client not found');
      car.klienti = client;
    }

    Object.assign(car, data);
    return this.carRepo.save(car);
  }

  async remove(id: number) {
    const car = await this.findOne(id);
    await this.carRepo.delete(id);
    return { message: 'Car deleted' };
  }
  async findDamages(id: number) {
    const car = await this.carRepo.findOne({
      where: { id },
      relations: ['damages'],
    });
    if (!car) throw new NotFoundException('Car not found');
    return { message: 'Car damages', damages: car.damages };
  }
}
