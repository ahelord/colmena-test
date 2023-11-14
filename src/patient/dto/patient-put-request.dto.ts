import { PartialType } from '@nestjs/swagger';
import { PatientPostRequestDto } from './patient-post-request.dto';

export class PatientPutRequestDto extends PartialType(PatientPostRequestDto) {}
