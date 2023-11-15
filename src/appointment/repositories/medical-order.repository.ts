import { EntityRepository, Repository } from 'typeorm';
import { MedicalOrder } from '../entities/medical-order.entity';

@EntityRepository(MedicalOrder)
export class MedicalOrderRepository extends Repository<MedicalOrder> {
  constructor() {
    super();
  }
}
