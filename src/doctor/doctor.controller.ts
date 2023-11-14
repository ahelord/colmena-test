import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorPostRequestDto } from './dto/doctor-post-request.dto';
import { DoctorPutRequestDto } from './dto/doctor-put-request.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async postDoctor(@Body() doctorPostRequestDto: DoctorPostRequestDto) {
    return await this.doctorService.createDoctor(doctorPostRequestDto);
  }

  @Get()
  async getDoctors() {
    return await this.doctorService.findDoctors();
  }

  @Get(':identificationDocument')
  async getDoctor(@Param('identificationDocument') identificationDocument: string) {
    return await this.doctorService.findDoctor(identificationDocument);
  }

  @Put(':id')
  async putDoctor(@Param('id') id: string, @Body() updateDoctorDto: DoctorPutRequestDto) {
    return await this.doctorService.updateDoctor(id, updateDoctorDto);
  }

  @Delete(':id')
  async deleteDoctor(@Param('id') id: string) {
    return await this.doctorService.removeDoctor(id);
  }
}
