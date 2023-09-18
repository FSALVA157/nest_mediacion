import { PartialType } from '@nestjs/mapped-types';
import { CreateVinculadoDto } from './create-vinculado.dto';

export class UpdateVinculadoDto extends PartialType(CreateVinculadoDto) {}
