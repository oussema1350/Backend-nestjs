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
exports.AzureMlService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let AzureMlService = class AzureMlService {
    constructor(configService) {
        this.configService = configService;
        this.apiUrl = this.configService.get('AZURE_ML_API_URL');
        this.apiKey = this.configService.get('AZURE_ML_API_KEY');
    }
    async getCropRecommendation(input) {
        try {
            const response = await axios_1.default.post(this.apiUrl, {
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
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                },
            });
            if (response.data && response.data.outputs && response.data.outputs.length > 0) {
                return response.data.outputs[0];
            }
            else {
                throw new common_1.HttpException('Invalid response from Azure ML', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        catch (error) {
            throw new common_1.HttpException(`Error calling Azure ML API: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
AzureMlService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AzureMlService);
exports.AzureMlService = AzureMlService;
//# sourceMappingURL=azure-ml.service.js.map