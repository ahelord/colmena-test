import { ArrayMinSize, IsArray, IsDate, IsString, IsUUID } from 'class-validator';
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

  @IsUUID(undefined, { each: true })
  @IsArray()
  @ArrayMinSize(1)
  medications: string[];
}
