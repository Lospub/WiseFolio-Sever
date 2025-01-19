import { Test, TestingModule } from '@nestjs/testing';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';

describe('BudgetController', () => {
  let controller: BudgetController;
  let service: BudgetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetController],
      providers: [
        {
          provide: BudgetService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: 'budget-uuid-123',
              user_id: 'user-uuid-123',
              amount: 500,
              category: 'Food',
              start_date: new Date('2025-01-01'),
              end_date: new Date('2025-01-31'),
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<BudgetController>(BudgetController);
    service = module.get<BudgetService>(BudgetService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a budget and return it', async () => {
      const mockBudget = {
        user_id: 'user-uuid-123',
        amount: 500,
        category: 'Food',
        start_date: new Date('2025-01-01'),
        end_date: new Date('2025-01-31'),
      };

      const result = await controller.create(mockBudget);
      expect(result).toHaveProperty('id', 'budget-uuid-123');
      expect(service.create).toHaveBeenCalledWith(mockBudget);
    });
  });
});
