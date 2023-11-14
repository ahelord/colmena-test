import { EntityRepository, Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';

@EntityRepository(Appointment)
export class AppointmentRepository extends Repository<Appointment> {
  constructor() {
    super();
  }
}
