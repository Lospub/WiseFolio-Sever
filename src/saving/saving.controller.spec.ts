import { Test, TestingModule } from '@nestjs/testing';
import { SavingController } from './saving.controller';
import { SavingService } from './saving.service';

describe('SavingController', () => {
  let controller: SavingController;
  let service: SavingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavingController],
      providers: [
        {
          provide: SavingService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: 'saving-uuid-123',
              user_id: 'user-uuid-123',
              amount: 2000,
              description: 'Emergency Fund',
              end_date: new Date('2025-12-31'),
            }),
            
          },
        },
      ],
    }).compile();

    controller = module.get<SavingController>(SavingController);
    service = module.get<SavingService>(SavingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
