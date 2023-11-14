import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentPostRequestDto } from './dto/appointment-post-request.dto';
import { AppointmentPutRequestDto } from './dto/appointment-put-request.dto';
import { AppointmentGetQuery } from './dto/appointment-get-query';
import { AppointmentGetAvailableQuery } from './dto/appointment-get-available-query';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async postAppointment(@Body() appointmentPostRequestDto: AppointmentPostRequestDto) {
    return await this.appointmentService.createAppointment(appointmentPostRequestDto);
  }

  @Get()
  getAppointments(@Query() query: AppointmentGetQuery) {
    return this.appointmentService.findAppointments(query);
  }

  @Get('doctors')
  getAvailableDoctors(@Query() query: AppointmentGetAvailableQuery) {
    return this.appointmentService.findAvailableDoctors(query);
  }

  @Get(':id')
  getAppointment(@Param('id') id: string) {
    return this.appointmentService.findAppointment(id);
  }

  @Put(':id')
  putAppointment(@Param('id') id: string, @Body() updateAppointmentDto: AppointmentPutRequestDto) {
    return this.appointmentService.updateAppointment(id, updateAppointmentDto);
  }

  @Delete(':id')
  deleteAppointment(@Param('id') id: string) {
    return this.appointmentService.deleteAppointment(id);
  }
}
