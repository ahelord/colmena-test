import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Patient } from '../../patient/entities/patient.entity';
import { AppointmentStatus } from './appointment-status.entity';

@Entity('appointment')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Doctor, doctor => doctor.appointments)
  doctor: Doctor;

  @ManyToOne(() => Patient, patient => patient.appointments)
  patient: Patient;

  @Column({ type: 'enum', enum: AppointmentStatus, nullable: true, default: AppointmentStatus.SCHEDULED })
  status: AppointmentStatus;

  @Column({ nullable: false })
  scheduleAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
