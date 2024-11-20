import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AzureMapsService } from './azure-maps.service';

@ApiTags('weather')
@Controller('azure-maps')
export class AzureMapsController {
  constructor(private readonly azureMapsService: AzureMapsService) {}

  @Get('weather')
  @ApiOperation({ summary: 'Get weather forecast for a location' })
  @ApiResponse({ status: 200, description: 'Weather data retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request, invalid coordinates.' })
  @ApiQuery({ name: 'lat', required: true, description: 'Latitude of the location', type: Number })
  @ApiQuery({ name: 'lng', required: true, description: 'Longitude of the location', type: Number })
  async getWeather(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
  ) {
    try {
      const weatherData = await this.azureMapsService.getWeather(lat, lng);
      return weatherData;
    } catch (error) {
      // Log the error for debugging
      console.error('Error in controller:', error.message);
      throw error;  // Forward the error to be handled by NestJS global error handler
    }
  }
}
