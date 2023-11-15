import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MedicamentService } from '../services/medicament.service';
import { MedicamentPostRequestDto } from '../dto/medicament-post-request.dto';
import { MedicamentPutRequestDto } from '../dto/medicament-put-request.dto';
import { ParamIdDto } from '../../common/dtos/param-id.dto';

@Controller('medicament')
export class MedicamentController {
  constructor(private readonly medicamentService: MedicamentService) {}

  @Post()
  async postMedicament(@Body() createMedicamentDto: MedicamentPostRequestDto) {
    return await this.medicamentService.createMedicament(createMedicamentDto);
  }

  @Get()
  async getMedications() {
    return await this.medicamentService.findMedicaments();
  }

  @Get(':id')
  async getMedicament(@Param() paramIdDto: ParamIdDto) {
    return await this.medicamentService.findMedicament(paramIdDto.id);
  }

  @Put(':id')
  async updateMedicament(@Param() paramIdDto: ParamIdDto, @Body() medicamentPutRequestDto: MedicamentPutRequestDto) {
    return await this.medicamentService.updateMedicament(paramIdDto.id, medicamentPutRequestDto);
  }

  @Delete(':id')
  async deleteMedicament(@Param() paramIdDto: ParamIdDto) {
    return await this.medicamentService.removeMedicament(paramIdDto.id);
  }
}
