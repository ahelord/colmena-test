import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Appointment } from '../../appointment/entities/appointment.entity';

@Entity('patient')
export class Patient extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 20 })
  identificationDocument: string;

  @Column({ nullable: false, length: 90 })
  firstName: string;

  @Column({ nullable: false, length: 90 })
  lastName: string;

  @Column({ nullable: false, length: 200 })
  email: string;

  @Column({ nullable: false, length: 20 })
  phone: string;

  @Column({ nullable: false, length: 200 })
  address: string;

  @Column({ nullable: false, length: 90 })
  city: string;

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Appointment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
