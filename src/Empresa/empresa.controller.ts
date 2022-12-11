

import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmpresaService } from './Services/empresa.service';

@Controller('empresa')
@ApiTags('Empresas')
export default class EmpresaController {
  constructor(private readonly service:EmpresaService){}

  
}
