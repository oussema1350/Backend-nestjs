import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AzureMlService {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiUrl = this.configService.get<string>('AZURE_ML_API_URL');
    this.apiKey = this.configService.get<string>('AZURE_ML_API_KEY');
  }

  async getCropRecommendation(input: {
    N: number;
    P: number;
    K: number;
    temperature: number;
    humidity: number;
    ph: number;
    rainfall: number;
  }): Promise<string> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          inputs: {
            data: [
              [
                input.N,
                input.P,
                input.K,
                input.temperature,
                input.humidity,
                input.ph,
                input.rainfall,
              ],
            ],
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
        },
      );

      if (response.data && response.data.outputs && response.data.outputs.length > 0) {
        return response.data.outputs[0];
      } else {
        throw new HttpException('Invalid response from Azure ML', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } catch (error) {
      throw new HttpException(
        `Error calling Azure ML API: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}