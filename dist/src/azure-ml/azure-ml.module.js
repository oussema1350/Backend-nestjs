"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureMlModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const azure_ml_controller_1 = require("./azure-ml.controller");
const azure_ml_service_1 = require("./azure-ml.service");
let AzureMlModule = class AzureMlModule {
};
AzureMlModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        controllers: [azure_ml_controller_1.AzureMlController],
        providers: [azure_ml_service_1.AzureMlService],
    })
], AzureMlModule);
exports.AzureMlModule = AzureMlModule;
//# sourceMappingURL=azure-ml.module.js.map