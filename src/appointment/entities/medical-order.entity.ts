import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Appointment } from './appointment.entity';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
