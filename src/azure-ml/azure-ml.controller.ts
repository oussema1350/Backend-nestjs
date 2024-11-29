import { Controller, Post, Body } from '@nestjs/common';
import { AzureMlService } from './azure-ml.service';

@Controller('azure-ml')
export class AzureMlController {
  constructor(private readonly azureMlService: AzureMlService) {}

  @Post('crop-recommendation')
  async getCropRecommendation(@Body() input: {
    N: number;
    P: number;
    K: number;
    temperature: number;
    humidity: number;
    ph: number;
    rainfall: number;
  }): Promise<{ recommendation: string }> {
    const recommendation = await this.azureMlService.getCropRecommendation(input);
    return { recommendation };
  }
}