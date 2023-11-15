import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class MedicamentPostRequestDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  diseases: string[];

  @IsString()
  name: string;

  @IsString()
  description: string;
}
