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
exports.CropManagementController = void 0;
const common_1 = require("@nestjs/common");
const crop_management_service_1 = require("./crop-management.service");
const create_crop_management_dto_1 = require("./dto/create-crop-management.dto");
const update_crop_management_dto_1 = require("./dto/update-crop-management.dto");
let CropManagementController = class CropManagementController {
    constructor(cropManagementService) {
        this.cropManagementService = cropManagementService;
    }
    create(createCropManagementDto) {
        return this.cropManagementService.create(createCropManagementDto);
    }
    findAll() {
        return this.cropManagementService.findAll();
    }
    findOne(id) {
        return this.cropManagementService.findOne(+id);
    }
    update(id, updateCropManagementDto) {
        return this.cropManagementService.update(+id, updateCropManagementDto);
    }
    remove(id) {
        return this.cropManagementService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_crop_management_dto_1.CreateCropManagementDto]),
    __metadata("design:returntype", void 0)
], CropManagementController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CropManagementController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CropManagementController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_crop_management_dto_1.UpdateCropManagementDto]),
    __metadata("design:returntype", void 0)
], CropManagementController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CropManagementController.prototype, "remove", null);
CropManagementController = __decorate([
    (0, common_1.Controller)('crop-management'),
    __metadata("design:paramtypes", [crop_management_service_1.CropManagementService])
], CropManagementController);
exports.CropManagementController = CropManagementController;
//# sourceMappingURL=crop-management.controller.js.map