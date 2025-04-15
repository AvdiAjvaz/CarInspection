import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Car } from 'src/cars/car.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  emri: string;

  @Column()
  mbiemri: string;

  @Column()
  numri_i_telefonit: string;

  @OneToMany(() => Car, (car) => car.klienti)
  cars: Car[];
}
