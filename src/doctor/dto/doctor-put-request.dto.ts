import {IsDateString, IsEmail, IsNumberString, IsOptional, IsString, MaxLength} from "class-validator";

export class DoctorPutRequestDto {
    @IsNumberString()
    @MaxLength(20)
    @IsOptional()
    readonly identificationDocument: string;

    @IsString()
    @MaxLength(90)
    @IsOptional()
    readonly firstName: string;

    @IsString()
    @MaxLength(90)
    @IsOptional()
    readonly lastName: string;

    @IsEmail()
    @MaxLength(200)
    @IsOptional()
    readonly email: string;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    readonly phone: string;

    @IsString()
    @MaxLength(200)
    @IsOptional()
    readonly address: string;

    @IsString()
    @MaxLength(90)
    @IsOptional()
    readonly city: string;

    @IsString()
    @IsOptional()
    professionalCard: string;

    @IsDateString()
    @IsOptional()
    admissionAt: Date;
}
