import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { AppointmentService } from '../services/appointment.service';
import { AppointmentPostRequestDto } from '../dto/appointment-post-request.dto';
import { AppointmentPutRequestDto } from '../dto/appointment-put-request.dto';
import { AppointmentGetQuery } from '../dto/appointment-get-query';
import { AppointmentGetAvailableQuery } from '../dto/appointment-get-available-query';
import { ParamIdDto } from '../../common/dtos/param-id.dto';

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
  getAppointment(@Param() paramIdDto: ParamIdDto) {
    return this.appointmentService.findAppointment(paramIdDto.id);
  }

  @Put(':id')
  putAppointment(@Param() paramIdDto: ParamIdDto, @Body() updateAppointmentDto: AppointmentPutRequestDto) {
    return this.appointmentService.updateAppointment(paramIdDto.id, updateAppointmentDto);
  }

  @Delete(':id')
  deleteAppointment(@Param() paramIdDto: ParamIdDto) {
    return this.appointmentService.deleteAppointment(paramIdDto.id);
  }
}
