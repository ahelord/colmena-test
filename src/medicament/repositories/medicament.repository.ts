import { EntityRepository, Repository } from 'typeorm';
import { Medicament } from '../entities/medicament.entity';

@EntityRepository(Medicament)
export class MedicamentRepository extends Repository<Medicament> {
  constructor() {
    super();
  }
}
