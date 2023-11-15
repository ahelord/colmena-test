import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentRepository } from './repositories/appointment.repository';
import { PatientRepository } from '../patient/repositories/patient.repository';
import { DoctorRepository } from '../doctor/repositories/doctor.repository';
import { MedicalOrderController } from './medical-order.controller';
import { MedicalOrderService } from './medical-order.service';
import { MedicalOrderRepository } from './repositories/medical-order.repository';
import { MedicamentRepository } from '../medicament/repositories/medicament.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AppointmentRepository,
      PatientRepository,
      DoctorRepository,
      MedicalOrderRepository,
      MedicamentRepository,
    ]),
  ],
  controllers: [AppointmentController, MedicalOrderController],
  providers: [AppointmentService, MedicalOrderService],
})
export class AppointmentModule {}
