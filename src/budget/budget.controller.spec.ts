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
            findOne: jest.fn().mockResolvedValue({
              id: 'budget-uuid-123',
              user_id: 'user-uuid-123',
              amount: 500,
              category: 'Food',
              start_date: new Date('2025-01-01'),
              end_date: new Date('2025-01-31'),
            }),
            findAllByUserId: jest.fn().mockResolvedValue([
              {
                id: 'budget-uuid-123',
                user_id: 'user-uuid-123',
                amount: 500,
                category: 'Food',
                start_date: new Date('2025-01-01'),
                end_date: new Date('2025-01-31'),
              },
            ]),
            update: jest.fn().mockResolvedValue({
              id: 'budget-uuid-123',
              user_id: 'user-uuid-123',
              amount: 600,
              category: 'Food',
              start_date: new Date('2025-01-01'),
              end_date: new Date('2025-01-31'),
            }),
            remove: jest.fn().mockResolvedValue(undefined),
            calculateSpent: jest.fn().mockResolvedValue(320),
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

  it('should create a budget', async () => {
    const mockBudget = {
      user_id: 'user-uuid-123',
      amount: 500,
      category: 'Food',
      start_date: new Date('2025-01-01'),
      end_date: new Date('2025-01-31'),
    };

    const result = await controller.create(mockBudget);
    expect(result).toHaveProperty('id');
    expect(service.create).toHaveBeenCalledWith(mockBudget);
  });

  it('should return a budget by ID', async () => {
    const mockId = 'budget-uuid-123';
    const mockBudget = {
      id: mockId,
      user_id: 'user-uuid-123',
      amount: 500,
      category: 'Food',
      start_date: new Date('2025-01-01'),
      end_date: new Date('2025-01-31'),
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(mockBudget);

    const budget = await controller.findOne(mockId);
    expect(budget).toEqual(mockBudget);
    expect(service.findOne).toHaveBeenCalledWith(mockId);
  });

  it('should return all budgets for a specific user', async () => {
    const mockUserId = 'user-uuid-123';
    const mockBudgets = [
      {
        id: 'budget-uuid-1',
        user_id: mockUserId,
        amount: 500,
        category: 'Food',
        start_date: new Date('2025-01-01'),
        end_date: new Date('2025-01-31'),
      },
      {
        id: 'budget-uuid-2',
        user_id: mockUserId,
        amount: 300,
        category: 'Transportation',
        start_date: new Date('2025-01-01'),
        end_date: new Date('2025-01-31'),
      }
    ];

    jest.spyOn(service, 'findAllByUserId').mockResolvedValue(mockBudgets);

    const result = await controller.findAllByUserId(mockUserId);
    expect(result).toHaveLength(2);
    expect(result).toEqual(mockBudgets);
    expect(service.findAllByUserId).toHaveBeenCalledWith(mockUserId);
  });

  it('should update a budget', async () => {
    const mockId = 'budget-uuid-123';
    const updates = { amount: 600 };
    const mockUpdatedBudget = {
      id: mockId,
      user_id: 'user-uuid-123',
      amount: 600,
      category: 'Food',
      start_date: new Date('2025-01-01'),
      end_date: new Date('2025-01-31'),
    };

    jest.spyOn(service, 'update').mockResolvedValue(mockUpdatedBudget);

    const updatedBudget = await controller.update(mockId, updates);
    expect(updatedBudget).toEqual(mockUpdatedBudget);
    expect(service.update).toHaveBeenCalledWith(mockId, updates);
  });

  it('should delete a budget', async () => {
    const mockId = 'budget-uuid-123';

    jest.spyOn(service, 'remove').mockResolvedValue();

    await expect(controller.remove(mockId)).resolves.not.toThrow();
    expect(service.remove).toHaveBeenCalledWith(mockId);
});

  it('should calculate the total spent in a budget category', async () => {
    const mockId = 'budget-uuid-123';

    const result = await controller.calculateSpent(mockId);
    expect(result).toHaveProperty('spent', 320);
    expect(service.calculateSpent).toHaveBeenCalledWith(mockId);
  });

});