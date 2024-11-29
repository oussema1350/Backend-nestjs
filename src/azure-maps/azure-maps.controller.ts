// azure-maps.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AzureMapsService } from './azure-maps.service';

@ApiTags('weather')
@Controller('azure-maps')
export class AzureMapsController {
  constructor(private readonly azureMapsService: AzureMapsService) {}

  @Get('weather')
  @ApiOperation({ summary: 'Get weather forecast for a location' })
  @ApiResponse({ status: 200, description: 'Weather data retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request, invalid coordinates.' })
  async getWeather() {
    try {
      // Default coordinates (if no parameters are provided)
      const defaultLat = 36.8189;
      const defaultLng = 10.1658;

      // Fetch weather data using the default coordinates
      const weatherData = await this.azureMapsService.getWeather(defaultLat, defaultLng);

      return weatherData;
    } catch (error) {
      // Log the error for debugging
      console.error('Error in controller:', error.message);
      throw error;  // Forward the error to be handled by NestJS global error handler
    }
  }
}
