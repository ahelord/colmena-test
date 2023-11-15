import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import { PatientPostRequestDto } from '../dto/patient-post-request.dto';
import { PatientPutRequestDto } from '../dto/patient-put-request.dto';
import { ParamIdDto } from '../../common/dtos/param-id.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async postPatient(@Body() patientPostRequestDto: PatientPostRequestDto) {
    return await this.patientService.createPatient(patientPostRequestDto);
  }

  @Get(':id')
  async getPatient(@Param() paramIdDto: ParamIdDto) {
    return await this.patientService.getPatient(paramIdDto.id);
  }

  @Put(':id')
  async putPatient(@Param() paramIdDto: ParamIdDto, @Body() patientPutRequestDto: PatientPutRequestDto) {
    return await this.patientService.updatePatient(paramIdDto.id, patientPutRequestDto);
  }

  @Delete(':id')
  async remove(@Param() paramIdDto: ParamIdDto) {
    return await this.patientService.removePatient(paramIdDto.id);
  }
}
