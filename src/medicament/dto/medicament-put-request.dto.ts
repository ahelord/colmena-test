import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

export class MedicamentPutRequestDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsOptional()
  diseases: string[];

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
