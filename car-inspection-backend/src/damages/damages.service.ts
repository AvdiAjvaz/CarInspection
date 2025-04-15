import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Damage } from './damage.entity';
import { CreateDamageDto } from './dto/create-damage.dto';
import { UpdateDamageDto } from './dto/update-damage.dto';
import { Car } from '../cars/car.entity';

@Injectable()
export class DamagesService {
  constructor(
    @InjectRepository(Damage)
    private damageRepository: Repository<Damage>,

    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  async create(dto: CreateDamageDto): Promise<Damage> {
    const car = await this.carRepository.findOne({ where: { id: dto.carId } });

    if (!car) {
      throw new NotFoundException('Veturë jo e gjetur');
    }

    const damage = this.damageRepository.create({
      car,
      x: dto.x,
      y: dto.y,
      pershkrimi: dto.pershkrimi,
      view: dto.view,
      status: dto.status,
      shkalla_e_demtimit: dto.shkalla_e_demtimit,
    });

    return this.damageRepository.save(damage);
  }

  async findAll(): Promise<Damage[]> {
    return this.damageRepository.find({ relations: ['car'] });
  }

  async findByCar(carId: number): Promise<Damage[]> {
    return this.damageRepository.find({
      where: { car: { id: carId } },
      relations: ['car'],
    });
  }

  async findOne(id: number): Promise<Damage> {
    const damage = await this.damageRepository.findOne({
      where: { id },
      relations: ['car'],
    });

    if (!damage) {
      throw new NotFoundException('Dëmtimi nuk u gjet');
    }

    return damage;
  }

  async update(id: number, dto: UpdateDamageDto): Promise<Damage> {
    const damage = await this.findOne(id);

    if (dto.x !== undefined) damage.x = dto.x;
    if (dto.y !== undefined) damage.y = dto.y;
    if (dto.pershkrimi !== undefined) damage.pershkrimi = dto.pershkrimi;

    return this.damageRepository.save(damage);
  }

  async remove(id: number): Promise<void> {
    const damage = await this.findOne(id);
    await this.damageRepository.remove(damage);
  }
}
