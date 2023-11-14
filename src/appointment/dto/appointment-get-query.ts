import { IsDate, IsNumberString, IsOptional, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class AppointmentGetQuery {
  @IsNumberString()
  @MaxLength(20)
  @IsOptional()
  readonly doctorIdentification: string;

  @IsNumberString()
  @MaxLength(20)
  @IsOptional()
  readonly patientIdentification: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  scheduleAt: Date;
}
