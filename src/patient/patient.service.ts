import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PatientPostRequestDto } from './dto/patient-post-request.dto';
import { PatientPutRequestDto } from './dto/patient-put-request.dto';
import { TodosRepository } from '../todos/repositories/todos.repository';
import { PatientRepository } from './repositories/patient.repository';
import { Errors } from '../common/entities/errors';
import { IsDeletedDto } from '../common/dtos/is-deleted.dto';

@Injectable()
export class PatientService {
  constructor(private readonly patientRepository: PatientRepository) {}

  async createPatient(patientPostRequestDto: PatientPostRequestDto) {
    const patientFound = await this.patientRepository.findOne({
      identificationDocument: patientPostRequestDto.identificationDocument,
    });
    if (patientFound) {
      throw new BadRequestException(Errors.PATIENT_ALREADY_EXISTS);
    }
    const patient = await this.patientRepository.save(patientPostRequestDto);
    return patient;
  }

  getPatient(id: string) {
    return this.patientRepository.findOne(id);
  }

  updatePatient(id: string, patientPutRequestDto: PatientPutRequestDto) {
    const patient = this.patientRepository.save({
      id,
      ...patientPutRequestDto,
    });
    return patient;
  }

  async removePatient(id: string): Promise<IsDeletedDto> {
    const deleteResult = await this.patientRepository.delete(id);
    return {
      isDeleted: deleteResult.affected >= 1,
    } as IsDeletedDto;
  }
}
