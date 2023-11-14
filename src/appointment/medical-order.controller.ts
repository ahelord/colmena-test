import { Body, Controller, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentPostRequestDto } from './dto/appointment-post-request.dto';
import { MedicalOrderService } from './medical-order.service';
import {MedicalOrderPostRequestDto} from "./dto/medical-order-post-request.dto";

@Controller('medical-order')
export class MedicalOrderController {
  constructor(private readonly medicalOrderService: MedicalOrderService) {}

  @Post()
  async postMedicalOrder(@Body() medicalOrderPostRequestDto: MedicalOrderPostRequestDto) {
    return await this.medicalOrderService.createMedicalOrder(medicalOrderPostRequestDto);
  }
}
