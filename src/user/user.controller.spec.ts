import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Test User', email: 'test@example.com' }]),
            createUser: jest.fn().mockResolvedValue({ id: 1, name: 'Test User', email: 'test@example.com' }),
          }, // Mocked methods
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should return a list of users', async () => {
    const result = await userController.findAll();
    expect(result).toEqual([{ id: 1, name: 'Test User', email: 'test@example.com' }]);
  });

  it('should create a user', async () => {
    const user = { email: 'test@example.com', name: 'Test User' };
    const result = await userController.createUser(user);
    expect(result).toEqual({ id: 1, name: 'Test User', email: 'test@example.com' });
  });
});
