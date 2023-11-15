import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Patient } from '../../patient/entities/patient.entity';
import { AppointmentStatus } from './appointment-status.entity';
import { MedicalOrder } from './medical-order.entity';

@Entity('appointment')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Doctor, doctor => doctor.appointments, { onDelete: 'CASCADE' })
  doctor: Doctor;

  @ManyToOne(() => Patient, patient => patient.appointments, { onDelete: 'CASCADE' })
  patient: Patient;

  @Column({ type: 'enum', enum: AppointmentStatus, nullable: true, default: AppointmentStatus.SCHEDULED })
  status: AppointmentStatus;

  @Column({ nullable: false })
  scheduleAt: Date;

  @OneToMany(() => MedicalOrder, medicalOrder => medicalOrder.appointment)
  medicalOrders: MedicalOrder[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
