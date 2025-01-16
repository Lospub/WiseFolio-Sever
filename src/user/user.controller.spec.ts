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
            signUp: jest.fn().mockResolvedValue({
              id: 'uuid-123',
              email: 'test@example.com',
              name: 'Test User',
            }),
            login: jest.fn().mockResolvedValue('<firebase-id-token>'),
            getUserByEmail: jest.fn().mockResolvedValue({
              id: 'uuid-123',
              email: 'test@example.com',
              name: 'Test User',
            }),
            updateUser: jest.fn().mockResolvedValue({
              id: 'firebase-uid-123',
              email: 'test@example.com',
              name: 'Updated Name',
            }), // Mock for updateUser
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('signUp', () => {
    it('should sign up a user and return their details', async () => {
      const body = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'securepassword123',
      };

      const result = await userController.signUp(body);
      expect(result).toEqual({
        id: 'uuid-123',
        email: 'test@example.com',
        name: 'Test User',
      });
      expect(userService.signUp).toHaveBeenCalledWith(
        body.email,
        body.name,
        body.password,
      );
    });
  });

  describe('login', () => {
    it('should log in a user and return an idToken', async () => {
      const body = { email: 'test@example.com', password: 'securepassword123' };

      const result = await userController.login(body);
      expect(result).toEqual({ idToken: '<firebase-id-token>' });
      expect(userService.login).toHaveBeenCalledWith(
        body.email,
        body.password,
      );
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user by email', async () => {
      const body = { email: 'test@example.com' };

      const result = await userController.getUserByEmail(body);
      expect(result).toEqual({
        id: 'uuid-123',
        email: 'test@example.com',
        name: 'Test User',
      });

      expect(userService.getUserByEmail).toHaveBeenCalledWith(body.email);
    });
  });

  describe('updateUser', () => {
    it('should update username and/or password', async () => {
      const body = {
        userId: 'firebase-uid-123',
        newName: 'Updated Name',
        newPassword: 'NewSecurePassword123',
      };

      const result = await userController.updateUser(body);

      expect(result).toEqual({
        id: 'firebase-uid-123',
        email: 'test@example.com',
        name: 'Updated Name',
      });

      expect(userService.updateUser).toHaveBeenCalledWith(
        body.userId,
        body.newName,
        body.newPassword,
      );
    });
  });
});
