import { Test, TestingModule } from '@nestjs/testing';
import { DoctorController } from '../controllers/doctor.controller';
import { DoctorService } from '../services/doctor.service';

describe('DoctorController', () => {
  let controller: DoctorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorController],
      providers: [DoctorService],
    }).compile();

    controller = module.get<DoctorController>(DoctorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
