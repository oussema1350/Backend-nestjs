import { AzureMapsService } from './azure-maps.service';
export declare class AzureMapsController {
    private readonly azureMapsService;
    constructor(azureMapsService: AzureMapsService);
    getWeather(lat: number, lng: number): Promise<any>;
}
