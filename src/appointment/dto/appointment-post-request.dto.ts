import { IsDate, IsDateString, IsEmail, IsNumberString, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class AppointmentPostRequestDto {
  @IsNumberString()
  @MaxLength(20)
  readonly doctorIdentification: string;

  @IsNumberString()
  @MaxLength(20)
  readonly patientIdentification: string;

  @Type(() => Date)
  @IsDate()
  scheduleAt: Date;
}
