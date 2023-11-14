import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientPostRequestDto } from './dto/patient-post-request.dto';
import { PatientPutRequestDto } from './dto/patient-put-request.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async postPatient(@Body() patientPostRequestDto: PatientPostRequestDto) {
    return await this.patientService.createPatient(patientPostRequestDto);
  }

  @Get(':id')
  async getPatient(@Param('id') id: string) {
    return await this.patientService.getPatient(id);
  }

  @Put(':id')
  async putPatient(@Param('id') id: string, @Body() patientPutRequestDto: PatientPutRequestDto) {
    return await this.patientService.updatePatient(id, patientPutRequestDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.patientService.removePatient(id);
  }
}
