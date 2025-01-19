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
                        findAllByUserId: jest.fn().mockResolvedValue([]),
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
                        remove: jest.fn().mockResolvedValue(undefined),
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

    it('should return an expense by ID', async () => {
        const mockId = 'expense-uuid-123';
        const mockExpense = {
            id: mockId,
            user_id: 'user-uuid-123',
            description: 'Lunch',
            amount: 15.5,
            category: 'Food',
            date: new Date(),
        };

        jest.spyOn(service, 'findOne').mockResolvedValue(mockExpense);

        const expense = await controller.findOne(mockId);
        expect(expense).toEqual(mockExpense);
        expect(service.findOne).toHaveBeenCalledWith(mockId);
    });

    it('should return all expenses for a specific user', async () => {
        const mockUserId = 'user-uuid-123';
        const mockExpenses = [
            {
                id: 'expense-uuid-1',
                user_id: mockUserId,
                description: 'Groceries',
                amount: 50,
                category: 'Food',
                date: new Date(),
            },
            {
                id: 'expense-uuid-2',
                user_id: mockUserId,
                description: 'Electricity Bill',
                amount: 100,
                category: 'Utilities',
                date: new Date(),
            },
        ];

        jest.spyOn(service, 'findAllByUserId').mockResolvedValue(mockExpenses);

        const result = await controller.findAllByUserId(mockUserId);
        expect(result).toEqual(mockExpenses);
        expect(service.findAllByUserId).toHaveBeenCalledWith(mockUserId);
    });

    it('should update an expense', async () => {
        const mockId = 'expense-uuid-123';
        const updates = { description: 'Updated Lunch' };
        const mockUpdatedExpense = {
            id: mockId,
            user_id: 'user-uuid-123',
            description: 'Updated Lunch',
            amount: 15.5,
            category: 'Food',
            date: new Date(),
        };

        jest.spyOn(service, 'update').mockResolvedValue(mockUpdatedExpense);

        const updatedExpense = await controller.update(mockId, updates);
        expect(updatedExpense).toEqual(mockUpdatedExpense);
        expect(service.update).toHaveBeenCalledWith(mockId, updates);
    });

    it('should delete an expense', async () => {
        const mockId = 'expense-uuid-123';

        jest.spyOn(service, 'remove').mockResolvedValue();

        await expect(controller.remove(mockId)).resolves.not.toThrow();
        expect(service.remove).toHaveBeenCalledWith(mockId);
    });
});
