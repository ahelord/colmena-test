import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class AppointmentGetAvailableQuery {

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  scheduleAt: Date;
}
