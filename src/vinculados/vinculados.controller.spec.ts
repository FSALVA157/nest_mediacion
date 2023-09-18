import { Test, TestingModule } from '@nestjs/testing';
import { VinculadosController } from './vinculados.controller';
import { VinculadosService } from './vinculados.service';

describe('VinculadosController', () => {
  let controller: VinculadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VinculadosController],
      providers: [VinculadosService],
    }).compile();

    controller = module.get<VinculadosController>(VinculadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
