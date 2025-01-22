import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  const mockCategoryService = {
    create: jest.fn((category: { id?: string; name: string }) => ({
      id: category.id || '1',
      name: category.name,
    })),
    findAll: jest.fn(() => [
      { id: '1', name: 'Food' },
      { id: '2', name: 'Transport' },
    ]),
    findOne: jest.fn((id: string) => ({
      id,
      name: 'Food',
    })),
    remove: jest.fn((id: string) => ({
      message: `Category with ID ${id} removed.`,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a category with a provided ID', async () => {
      const result = await controller.create({ id: 'custom-id', name: 'Food' });
      expect(result).toEqual({ id: 'custom-id', name: 'Food' });
      expect(service.create).toHaveBeenCalledWith({ id: 'custom-id', name: 'Food' });
    });

    it('should create a category without a provided ID', async () => {
      const result = await controller.create({ name: 'Transport' });
      expect(result).toEqual({ id: '1', name: 'Transport' });
      expect(service.create).toHaveBeenCalledWith({ name: 'Transport' });
    });
  });

  describe('findAll', () => {
    it('should return all categories', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([
        { id: '1', name: 'Food' },
        { id: '2', name: 'Transport' },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single category by ID', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual({ id: '1', name: 'Food' });
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('remove', () => {
    it('should remove a category by ID', async () => {
      const result = await controller.remove('1');
      expect(result).toEqual({ message: `Category with ID 1 removed.` });
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
