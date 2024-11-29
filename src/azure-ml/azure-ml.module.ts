import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AzureMlController } from './azure-ml.controller';
import { AzureMlService } from './azure-ml.service';

@Module({
  imports: [ConfigModule],
  controllers: [AzureMlController],
  providers: [AzureMlService],
})
export class AzureMlModule {}