import { BadRequestException, Injectable } from '@nestjs/common';
import { MedicalOrderPostRequestDto } from './dto/medical-order-post-request.dto';
import { Errors } from '../common/entities/errors';
import { AppointmentRepository } from './repositories/appointment.repository';
import { MedicalOrderRepository } from './repositories/medical-order.repository';
import { Medicament } from '../medicament/entities/medicament.entity';
import { MedicamentRepository } from '../medicament/repositories/medicament.repository';

@Injectable()
export class MedicalOrderService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly medicalOrderRepository: MedicalOrderRepository,
    private readonly medicamentRepository: MedicamentRepository
  ) {}
  async createMedicalOrder(medicalOrderPostRequestDto: MedicalOrderPostRequestDto) {
    const appointment = await this.appointmentRepository.findOne(medicalOrderPostRequestDto.appointmentId);
    if (!appointment) throw new BadRequestException(Errors.APPOINTMENT_NOT_FOUND);
    const medications: Medicament[] = [];
    for (const medicationId of medicalOrderPostRequestDto.medications) {
      const medicament = await this.medicamentRepository.findOne(medicationId);
      if (medicament) {
        medications.push(medicament);
      }
    }
    return this.medicalOrderRepository.save({
      appointment,
      description: medicalOrderPostRequestDto.description,
      expiresIn: medicalOrderPostRequestDto.expiresIn,
      specialty: medicalOrderPostRequestDto.specialty,
      medications,
    });
  }
}
