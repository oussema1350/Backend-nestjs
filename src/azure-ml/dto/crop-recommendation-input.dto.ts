import { IsNumber, IsNotEmpty } from 'class-validator';

export class CropRecommendationInputDto {
  @IsNumber()
  @IsNotEmpty()
  N: number;

  @IsNumber()
  @IsNotEmpty()
  P: number;

  @IsNumber()
  @IsNotEmpty()
  K: number;

  @IsNumber()
  @IsNotEmpty()
  temperature: number;

  @IsNumber()
  @IsNotEmpty()
  humidity: number;

  @IsNumber()
  @IsNotEmpty()
  ph: number;

  @IsNumber()
  @IsNotEmpty()
  rainfall: number;
}