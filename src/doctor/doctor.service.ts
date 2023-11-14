import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DoctorPostRequestDto } from './dto/doctor-post-request.dto';
import { DoctorPutRequestDto } from './dto/doctor-put-request.dto';
import { Errors } from '../common/entities/errors';
import { DoctorRepository } from './repositories/doctor.repository';
import { IsDeletedDto } from '../common/dtos/is-deleted.dto';

@Injectable()
export class DoctorService {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async createDoctor(doctorPostRequestDto: DoctorPostRequestDto) {
    const doctorFound = await this.doctorRepository.findOne({
      identificationDocument: doctorPostRequestDto.identificationDocument,
    });
    if (doctorFound) {
      throw new BadRequestException(Errors.DOCTOR_ALREADY_EXISTS);
    }
    const doctor = await this.doctorRepository.save(doctorPostRequestDto);
    return doctor;
  }

  async findDoctors() {
    return await this.doctorRepository.find();
  }

  async findDoctor(identificationDocument: string) {
    const doctor = await this.doctorRepository.findOne({ identificationDocument });
    if (!doctor) throw new NotFoundException(Errors.DOCTOR_NOT_FOUND);
    return doctor;
  }

  async updateDoctor(id: string, doctorPutRequestDto: DoctorPutRequestDto) {
    const doctor = await this.doctorRepository.findOne(id);
    if (!doctor) throw new BadRequestException(Errors.DOCTOR_NOT_FOUND);
    return this.doctorRepository.save({
      id,
      ...doctorPutRequestDto,
    });
  }

  async removeDoctor(id: string) {
    const deleteResult = await this.doctorRepository.delete(id);
    if (deleteResult.affected === 0) throw new NotFoundException(Errors.DOCTOR_NOT_FOUND);
    return {
      isDeleted: deleteResult.affected >= 1,
    } as IsDeletedDto;
  }
}
