import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Client } from '../clients/client.entity';
import { Damage } from '../damages/damage.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lloji: string;

  @Column()
  ngjyra: string;

  @Column()
  nr_targave: string;

  @ManyToOne(() => Client, (client) => client.cars, { eager: true })
  klienti: Client;

  @OneToMany(() => Damage, (damage) => damage.car)
  damages: Damage[];
}
