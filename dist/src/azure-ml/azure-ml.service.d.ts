import { ConfigService } from '@nestjs/config';
export declare class AzureMlService {
    private configService;
    private readonly apiUrl;
    private readonly apiKey;
    constructor(configService: ConfigService);
    getCropRecommendation(input: {
        N: number;
        P: number;
        K: number;
        temperature: number;
        humidity: number;
        ph: number;
        rainfall: number;
    }): Promise<string>;
}
