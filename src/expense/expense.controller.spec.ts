import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';

describe('ExpenseController', () => {
    let controller: ExpenseController;
    let service: ExpenseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ExpenseController],
            providers: [
                {
                    provide: ExpenseService,
                    useValue: {
                        create: jest.fn().mockResolvedValue({
                            id: 'expense-uuid-123',
                            user_id: 'user-uuid-123',
                            description: 'Groceries',
                            amount: 100,
                            category: 'Food',
                            date: new Date(),
                        }),
                        findAll: jest.fn().mockResolvedValue([]),
                        findOne: jest.fn().mockResolvedValue({
                            id: 'expense-uuid-123',
                            user_id: 'user-uuid-123',
                            description: 'Groceries',
                            amount: 100,
                            category: 'Food',
                            date: new Date(),
                        }),
                        update: jest.fn().mockResolvedValue({
                            id: 'expense-uuid-123',
                            user_id: 'user-uuid-123',
                            description: 'Updated Groceries',
                            amount: 100,
                            category: 'Food',
                            date: new Date(),
                        }),
                        remove: jest.fn().mockResolvedValue({
                            id: 'expense-uuid-123',
                            user_id: 'user-uuid-123',
                            description: 'Groceries',
                            amount: 100,
                            category: 'Food',
                            date: new Date(),
                        }),
                    },
                },
            ],
        }).compile();

        controller = module.get<ExpenseController>(ExpenseController);
        service = module.get<ExpenseService>(ExpenseService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create an expense', async () => {
        const mockExpense = {
            user_id: 'user-uuid-123',
            description: 'Groceries',
            amount: 100,
            category: 'Food',
            date: new Date(),
        };

        const result = await controller.create(mockExpense);
        expect(result).toHaveProperty('id');
        expect(service.create).toHaveBeenCalledWith(mockExpense);
    });
});
