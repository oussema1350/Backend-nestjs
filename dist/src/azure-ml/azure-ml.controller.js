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
exports.AzureMlController = void 0;
const common_1 = require("@nestjs/common");
const azure_ml_service_1 = require("./azure-ml.service");
let AzureMlController = class AzureMlController {
    constructor(azureMlService) {
        this.azureMlService = azureMlService;
    }
    async getCropRecommendation(input) {
        const recommendation = await this.azureMlService.getCropRecommendation(input);
        return { recommendation };
    }
};
__decorate([
    (0, common_1.Post)('crop-recommendation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AzureMlController.prototype, "getCropRecommendation", null);
AzureMlController = __decorate([
    (0, common_1.Controller)('azure-ml'),
    __metadata("design:paramtypes", [azure_ml_service_1.AzureMlService])
], AzureMlController);
exports.AzureMlController = AzureMlController;
//# sourceMappingURL=azure-ml.controller.js.map