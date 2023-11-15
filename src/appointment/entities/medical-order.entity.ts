import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { Appointment } from './appointment.entity';
import { Medicament } from '../../medicament/entities/medicament.entity';

@Entity('medical_order')
export class MedicalOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Appointment, appointment => appointment.medicalOrders)
  appointment: Appointment;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  specialty: string;

  @Column({ nullable: false })
  expiresIn: Date;

  @ManyToMany(() => Medicament, { eager: true })
  @JoinTable()
  medications: Medicament[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
