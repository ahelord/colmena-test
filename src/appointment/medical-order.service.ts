import { BadRequestException, Injectable } from '@nestjs/common';
import { MedicalOrderPostRequestDto } from './dto/medical-order-post-request.dto';
import { Errors } from '../common/entities/errors';
import { AppointmentRepository } from './repositories/appointment.repository';
import { MedicalOrderRepository } from './repositories/medical-order.repository';

@Injectable()
export class MedicalOrderService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly medicalOrderRepository: MedicalOrderRepository
  ) {}
  async createMedicalOrder(medicalOrderPostRequestDto: MedicalOrderPostRequestDto) {
    const appointment = await this.appointmentRepository.findOne(medicalOrderPostRequestDto.appointmentId);
    if (!appointment) throw new BadRequestException(Errors.APPOINTMENT_NOT_FOUND);
    return this.medicalOrderRepository.save({
      appointment,
      description: medicalOrderPostRequestDto.description,
      expiresIn: medicalOrderPostRequestDto.expiresIn,
      specialty: medicalOrderPostRequestDto.specialty,
    });
  }
}
