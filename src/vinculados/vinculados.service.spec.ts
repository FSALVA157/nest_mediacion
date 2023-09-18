import { Test, TestingModule } from '@nestjs/testing';
import { VinculadosService } from './vinculados.service';

describe('VinculadosService', () => {
  let service: VinculadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VinculadosService],
    }).compile();

    service = module.get<VinculadosService>(VinculadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
