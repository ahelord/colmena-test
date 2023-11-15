import { Module } from '@nestjs/common';
import { MedicamentService } from './services/medicament.service';
import { MedicamentController } from './controllers/medicament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicamentRepository } from './repositories/medicament.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MedicamentRepository])],
  controllers: [MedicamentController],
  providers: [MedicamentService],
})
export class MedicamentModule {}
