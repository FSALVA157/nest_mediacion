import { PartialType } from '@nestjs/mapped-types';
import { CreateConvocadoSaltaDto } from './create-convocado-salta.dto';

export class UpdateConvocadoDto extends PartialType(CreateConvocadoSaltaDto) {}
