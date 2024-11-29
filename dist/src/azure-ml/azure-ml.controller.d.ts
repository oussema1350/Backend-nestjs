import { AzureMlService } from './azure-ml.service';
export declare class AzureMlController {
    private readonly azureMlService;
    constructor(azureMlService: AzureMlService);
    getCropRecommendation(input: {
        N: number;
        P: number;
        K: number;
        temperature: number;
        humidity: number;
        ph: number;
        rainfall: number;
    }): Promise<{
        recommendation: string;
    }>;
}
