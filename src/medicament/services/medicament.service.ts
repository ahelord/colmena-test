import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MedicamentPostRequestDto } from '../dto/medicament-post-request.dto';
import { MedicamentPutRequestDto } from '../dto/medicament-put-request.dto';
import { Errors } from '../../common/entities/errors';
import { IsDeletedDto } from '../../common/dtos/is-deleted.dto';
import { MedicamentRepository } from '../repositories/medicament.repository';

@Injectable()
export class MedicamentService {
  constructor(private readonly medicamentRepository: MedicamentRepository) {}

  async createMedicament(medicamentPostRequestDto: MedicamentPostRequestDto) {
    return await this.medicamentRepository.save(medicamentPostRequestDto);
  }

  async findMedicaments() {
    return await this.medicamentRepository.find();
  }

  async findMedicament(id: string) {
    const medicament = await this.medicamentRepository.findOne(id);
    if (!medicament) throw new NotFoundException(Errors.MEDICAMENT_NOT_FOUND);
    return medicament;
  }

  async updateMedicament(id: string, medicamentPutRequestDto: MedicamentPutRequestDto) {
    const medicament = await this.medicamentRepository.findOne(id);
    if (!medicament) throw new BadRequestException(Errors.MEDICAMENT_NOT_FOUND);
    return this.medicamentRepository.save({
      id,
      ...medicamentPutRequestDto,
    });
  }

  async removeMedicament(id: string) {
    const deleteResult = await this.medicamentRepository.delete(id);
    if (deleteResult.affected === 0) throw new NotFoundException(Errors.MEDICAMENT_NOT_FOUND);
    return {
      isDeleted: deleteResult.affected >= 1,
    } as IsDeletedDto;
  }
}
