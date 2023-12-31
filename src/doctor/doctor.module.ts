import { Module } from '@nestjs/common';
import { DoctorService } from './services/doctor.service';
import { DoctorController } from './controllers/doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorRepository } from './repositories/doctor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorRepository])],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
