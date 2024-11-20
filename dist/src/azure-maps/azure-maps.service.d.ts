import { ConfigService } from '@nestjs/config';
export declare class AzureMapsService {
    private readonly configService;
    private readonly azureMapsEndpoint;
    private readonly apiKey;
    constructor(configService: ConfigService);
    getWeather(latitude: number, longitude: number): Promise<any>;
}
