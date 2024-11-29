import { PartialType } from '@nestjs/swagger';
import { CreateAzureMlDto } from './create-azure-ml.dto';

export class UpdateAzureMlDto extends PartialType(CreateAzureMlDto) {}
