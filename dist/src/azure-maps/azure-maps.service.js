"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureMapsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const config_1 = require("@nestjs/config");
let AzureMapsService = class AzureMapsService {
    constructor(configService) {
        this.configService = configService;
        this.azureMapsEndpoint = 'https://atlas.microsoft.com';
        this.apiKey = this.configService.get('azureMaps.key');
    }
    async getWeather(latitude, longitude) {
        const url = `${this.azureMapsEndpoint}/weather/forecast/daily/json?api-version=1.1&query=${latitude},${longitude}&subscription-key=${this.apiKey}`;
        try {
            const response = await axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            console.error('Error while fetching weather data:', error);
            throw error;
        }
    }
};
AzureMapsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AzureMapsService);
exports.AzureMapsService = AzureMapsService;
//# sourceMappingURL=azure-maps.service.js.map