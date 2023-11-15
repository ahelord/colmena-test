import { Body, Controller, Post } from '@nestjs/common';
import { MedicalOrderService } from '../services/medical-order.service';
import { MedicalOrderPostRequestDto } from '../dto/medical-order-post-request.dto';
@Controller('medical-order')
export class MedicalOrderController {
  constructor(private readonly medicalOrderService: MedicalOrderService) {}

  @Post()
  async postMedicalOrder(@Body() medicalOrderPostRequestDto: MedicalOrderPostRequestDto) {
    return await this.medicalOrderService.createMedicalOrder(medicalOrderPostRequestDto);
  }
}
