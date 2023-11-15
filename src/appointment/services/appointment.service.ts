import { BadRequestException, Injectable } from '@nestjs/common';
import { AppointmentPostRequestDto } from '../dto/appointment-post-request.dto';
import { AppointmentPutRequestDto } from '../dto/appointment-put-request.dto';
import { AppointmentRepository } from '../repositories/appointment.repository';
import { DoctorRepository } from '../../doctor/repositories/doctor.repository';
import { PatientRepository } from '../../patient/repositories/patient.repository';
import { Errors } from '../../common/entities/errors';
import { Appointment } from '../entities/appointment.entity';
import { AppointmentGetQuery } from '../dto/appointment-get-query';
import { IsDeletedDto } from '../../common/dtos/is-deleted.dto';
import { AppointmentGetAvailableQuery } from '../dto/appointment-get-available-query';

@Injectable()
export class AppointmentService {
  private MINUTES_OF_APPOINTMENT = 30;

  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly doctorRepository: DoctorRepository,
    private readonly patientRepository: PatientRepository
  ) {}

  async createAppointment(appointmentPostRequestDto: AppointmentPostRequestDto) {
    const now = new Date();
    if (appointmentPostRequestDto.scheduleAt <= now) throw new BadRequestException(Errors.APPOINTMENT_IN_PAST);
    const patient = await this.patientRepository.findOne({
      identificationDocument: appointmentPostRequestDto.patientIdentification,
    });
    if (!patient) throw new BadRequestException(Errors.PATIENT_NOT_FOUND);

    const doctor = await this.doctorRepository.findOne({
      identificationDocument: appointmentPostRequestDto.doctorIdentification,
    });
    if (!doctor) throw new BadRequestException(Errors.DOCTOR_NOT_FOUND);

    const isAvailable = this.checkAvailable(appointmentPostRequestDto.scheduleAt, doctor.appointments);

    if (!isAvailable) throw new BadRequestException(Errors.APPOINTMENT_NO_AVAILABILITY);
    return this.appointmentRepository.save({ scheduleAt: appointmentPostRequestDto.scheduleAt, doctor, patient });
  }

  checkAvailable(scheduleAt: Date, appointments: Appointment[]) {
    const isAvailable = !appointments.some(appointment => {
      const scheduleEnd = new Date(appointment.scheduleAt);
      scheduleEnd.setMinutes(scheduleEnd.getMinutes() + this.MINUTES_OF_APPOINTMENT);
      return scheduleAt >= appointment.scheduleAt && scheduleAt <= scheduleEnd;
    });
    return isAvailable;
  }

  async findAvailableDoctors(appointmentGetAvailableQuery: AppointmentGetAvailableQuery) {
    const doctors = await this.doctorRepository.find();
    return doctors.filter(doctor => this.checkAvailable(appointmentGetAvailableQuery.scheduleAt, doctor.appointments));
  }

  async findAppointments(appointmentGetQuery: AppointmentGetQuery) {
    const queryBuilder = this.appointmentRepository.createQueryBuilder('appointment');

    queryBuilder
      .innerJoinAndSelect('appointment.doctor', 'doctor')
      .innerJoinAndSelect('appointment.patient', 'patient');

    if (appointmentGetQuery.doctorIdentification) {
      queryBuilder.andWhere('doctor.identificationDocument = :doctorIdentification', {
        doctorIdentification: appointmentGetQuery.doctorIdentification,
      });
    }

    if (appointmentGetQuery.patientIdentification) {
      queryBuilder.andWhere('patient.identificationDocument = :patientIdentification', {
        patientIdentification: appointmentGetQuery.patientIdentification,
      });
    }

    if (appointmentGetQuery.scheduleAt) {
      queryBuilder.andWhere('appointment.scheduleAt = :scheduleAt', {
        scheduleAt: appointmentGetQuery.scheduleAt,
      });
    }

    return await queryBuilder.getMany();
  }

  async findAppointment(id: string) {
    return await this.appointmentRepository.findOne(id, {
      relations: ['doctor', 'patient'],
    });
  }

  async updateAppointment(id: string, appointmentPutRequestDto: AppointmentPutRequestDto) {
    const appointment = await this.appointmentRepository.findOne(id);
    if (!appointment) throw new BadRequestException(Errors.APPOINTMENT_NOT_FOUND);

    const now = new Date();
    if (appointmentPutRequestDto.scheduleAt <= now) throw new BadRequestException(Errors.APPOINTMENT_IN_PAST);

    const entity = {
      id,
    } as Appointment;

    if (appointmentPutRequestDto.doctorIdentification) {
      const doctor = await this.doctorRepository.findOne({
        identificationDocument: appointmentPutRequestDto.doctorIdentification,
      });
      if (!doctor) throw new BadRequestException(Errors.DOCTOR_NOT_FOUND);
      const appointments = doctor.appointments.filter(appointment => appointment.id != id);
      const isAvailable = this.checkAvailable(appointmentPutRequestDto.scheduleAt, appointments);
      if (!isAvailable) throw new BadRequestException(Errors.APPOINTMENT_NO_AVAILABILITY);

      entity.doctor = doctor;
      entity.scheduleAt = appointmentPutRequestDto.scheduleAt;
    }
    if (appointmentPutRequestDto.patientIdentification) {
      const patient = await this.patientRepository.findOne({
        identificationDocument: appointmentPutRequestDto.patientIdentification,
      });
      if (!patient) throw new BadRequestException(Errors.PATIENT_NOT_FOUND);
      entity.patient = patient;
    }
    entity.status = appointmentPutRequestDto.status;
    return await this.appointmentRepository.save(entity);
  }

  async deleteAppointment(id: string) {
    const deleteResult = await this.appointmentRepository.delete(id);
    return {
      isDeleted: deleteResult.affected >= 1,
    } as IsDeletedDto;
  }
}
