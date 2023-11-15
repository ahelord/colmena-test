import { Module } from '@nestjs/common';
import { AppointmentService } from './services/appointment.service';
import { AppointmentController } from './controllers/appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentRepository } from './repositories/appointment.repository';
import { PatientRepository } from '../patient/repositories/patient.repository';
import { DoctorRepository } from '../doctor/repositories/doctor.repository';
import { MedicalOrderController } from './controllers/medical-order.controller';
import { MedicalOrderService } from './services/medical-order.service';
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
