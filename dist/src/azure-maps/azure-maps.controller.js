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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureMapsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const azure_maps_service_1 = require("./azure-maps.service");
let AzureMapsController = class AzureMapsController {
    constructor(azureMapsService) {
        this.azureMapsService = azureMapsService;
    }
    async getWeather(lat, lng) {
        try {
            const weatherData = await this.azureMapsService.getWeather(lat, lng);
            return weatherData;
        }
        catch (error) {
            console.error('Error in controller:', error.message);
            throw error;
        }
    }
};
__decorate([
    (0, common_1.Get)('weather'),
    (0, swagger_1.ApiOperation)({ summary: 'Get weather forecast for a location' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Weather data retrieved successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request, invalid coordinates.' }),
    (0, swagger_1.ApiQuery)({ name: 'lat', required: true, description: 'Latitude of the location', type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'lng', required: true, description: 'Longitude of the location', type: Number }),
    __param(0, (0, common_1.Query)('lat')),
    __param(1, (0, common_1.Query)('lng')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AzureMapsController.prototype, "getWeather", null);
AzureMapsController = __decorate([
    (0, swagger_1.ApiTags)('weather'),
    (0, common_1.Controller)('azure-maps'),
    __metadata("design:paramtypes", [azure_maps_service_1.AzureMapsService])
], AzureMapsController);
exports.AzureMapsController = AzureMapsController;
//# sourceMappingURL=azure-maps.controller.js.map