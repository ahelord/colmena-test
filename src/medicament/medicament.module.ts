import { Module } from '@nestjs/common';
import { MedicamentService } from './medicament.service';
import { MedicamentController } from './medicament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicamentRepository } from './repositories/medicament.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MedicamentRepository])],
  controllers: [MedicamentController],
  providers: [MedicamentService],
})
export class MedicamentModule {}
