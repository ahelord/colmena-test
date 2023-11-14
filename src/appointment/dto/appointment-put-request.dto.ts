import { IsDate, IsEnum, IsNumberString, IsOptional, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { AppointmentStatus } from '../entities/appointment-status.entity';

export class AppointmentPutRequestDto {
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

  @IsEnum(AppointmentStatus)
  @IsOptional()
  status: AppointmentStatus;
}
