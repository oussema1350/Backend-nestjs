import { PartialType } from '@nestjs/swagger';
import { CreateAzureMapDto } from './create-azure-map.dto';

export class UpdateAzureMapDto extends PartialType(CreateAzureMapDto) {}
