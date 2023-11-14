import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentRepository } from './repositories/appointment.repository';
import { PatientRepository } from '../patient/repositories/patient.repository';
import { DoctorRepository } from '../doctor/repositories/doctor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentRepository, PatientRepository, DoctorRepository])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
