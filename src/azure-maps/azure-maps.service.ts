import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AzureMapsService {
  private readonly azureMapsEndpoint = 'https://atlas.microsoft.com';
  private readonly apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('azureMaps.key');
  }

  // Method to get weather data from Azure Maps API
  async getWeather(latitude: number, longitude: number): Promise<any> {
    const url = `${this.azureMapsEndpoint}/weather/forecast/daily/json?api-version=1.1&query=${latitude},${longitude}&subscription-key=${this.apiKey}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error while fetching weather data:', error);
      throw error;
    }
  }
}
