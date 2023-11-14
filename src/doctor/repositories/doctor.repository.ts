import { EntityRepository, Repository } from 'typeorm';
import { Doctor } from '../entities/doctor.entity';

@EntityRepository(Doctor)
export class DoctorRepository extends Repository<Doctor> {
  constructor() {
    super();
  }
}
