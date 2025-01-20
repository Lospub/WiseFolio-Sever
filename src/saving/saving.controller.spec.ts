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
            findOne: jest.fn().mockResolvedValue({
              id: 'saving-uuid-123',
              user_id: 'user-uuid-123',
              amount: 2000,
              description: 'Emergency Fund',
              end_date: new Date('2025-12-31'),
            }),
            findAllByUserId: jest.fn().mockResolvedValue([
              {
                id: 'saving-uuid-123',
                user_id: 'user-uuid-123',
                amount: 2000,
                description: 'Emergency Fund',
                end_date: new Date('2025-12-31'),
              },
            ]),
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

  it('should create a saving goal', async () => {
    const mockSaving = {
      user_id: 'user-uuid-123',
      amount: 2000,
      description: 'Emergency Fund',
      end_date: new Date('2025-12-31'),
    };

    const result = await controller.create(mockSaving);
    expect(result).toHaveProperty('id');
    expect(service.create).toHaveBeenCalledWith(mockSaving);
  });

  it('should return a saving goal by ID', async () => {
    const mockId = 'saving-uuid-123';
    const mockSaving = {
      id: mockId,
      user_id: 'user-uuid-123',
      amount: 2000,
      description: 'Emergency Fund',
      end_date: new Date('2025-12-31'),
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(mockSaving);

    const result = await controller.findOne(mockId);
    expect(result).toEqual(mockSaving);
    expect(service.findOne).toHaveBeenCalledWith(mockId);
  });

  it('should return all saving goals for a specific user', async () => {
    const mockUserId = 'user-uuid-123';
    const mockSavings = [
      {
        id: 'saving-uuid-1',
        user_id: mockUserId,
        amount: 2000,
        description: 'Emergency Fund',
        end_date: new Date('2025-12-31'),
      },
      {
        id: 'saving-uuid-2',
        user_id: mockUserId,
        amount: 300000,
        description: 'House',
        end_date: new Date('2026-12-31'),
      }
    ];

    jest.spyOn(service, 'findAllByUserId').mockResolvedValue(mockSavings);

    const result = await controller.findAllByUserId(mockUserId);
    expect(result).toHaveLength(2);
    expect(result).toEqual(mockSavings);
    expect(service.findAllByUserId).toHaveBeenCalledWith(mockUserId);
  });
});
