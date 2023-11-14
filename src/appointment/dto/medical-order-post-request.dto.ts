import { IsDate, IsNumberString, IsString, IsUUID, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class MedicalOrderPostRequestDto {
  @IsString()
  readonly description: string;

  @IsString()
  readonly specialty: string;

  @IsUUID()
  readonly appointmentId: string;

  @Type(() => Date)
  @IsDate()
  expiresIn: Date;
}
