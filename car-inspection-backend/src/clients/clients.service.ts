import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepo: Repository<Client>,
  ) {}

  create(data: CreateClientDto) {
    const client = this.clientRepo.create(data);
    return this.clientRepo.save(client);
  }

  findAll() {
    return this.clientRepo.find();
  }

  async findOne(id: number) {
    const client = await this.clientRepo.findOne({ where: { id } });
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async update(id: number, data: UpdateClientDto) {
    await this.findOne(id);
    await this.clientRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.clientRepo.delete(id);
    return { message: 'Client deleted' };
  }
}
