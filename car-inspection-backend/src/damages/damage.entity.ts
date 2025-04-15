import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Car } from '../cars/car.entity';

@Entity()
export class Damage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car, (car) => car.damages, { onDelete: 'CASCADE' })
  car: Car;

  @Column('float')
  x: number;

  @Column('float')
  y: number;

  @Column()
  pershkrimi: string;

  @Column({ nullable: true })
  view: string; // ✅ opsionale

  @Column({ nullable: true, default: false })
  status: boolean; // ✅ opsionale

  @Column({ nullable: true })
  shkalla_e_demtimit: string; // ✅ opsionale, do të vendoset automatikisht në server

  @CreateDateColumn({ name: 'data_e_regjistrimit' })
  dataERegjistrimit: Date;
}
