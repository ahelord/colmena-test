import { IsNotEmpty } from 'class-validator';

export class ExpoTokenDto {
  @IsNotEmpty()
  expoPushToken: string;
}
