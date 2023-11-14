import { IsEmail, IsNumberString, IsString, MaxLength } from 'class-validator';

export class PatientPostRequestDto {
  @IsNumberString()
  @MaxLength(20)
  readonly identificationDocument: string;

  @IsString()
  @MaxLength(90)
  readonly firstName: string;

  @IsString()
  @MaxLength(90)
  readonly lastName: string;

  @IsEmail()
  @MaxLength(200)
  readonly email: string;

  @IsString()
  @MaxLength(20)
  readonly phone: string;

  @IsString()
  @MaxLength(200)
  readonly address: string;

  @IsString()
  @MaxLength(90)
  readonly city: string;
}
