import { Module } from '@nestjs/common';
import { AzureMapsService } from './azure-maps.service';
import { AzureMapsController } from './azure-maps.controller';

@Module({
  controllers: [AzureMapsController],
  providers: [AzureMapsService]
})
export class AzureMapsModule {}
