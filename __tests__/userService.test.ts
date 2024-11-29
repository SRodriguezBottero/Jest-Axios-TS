import { UserService } from '../src/services/userService';
import axios from 'axios';

// Mock axios to avoid real network calls
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should fetch users successfully', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', username: 'johndoe' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', username: 'janesmith' }
      ];

      mockedAxios.get.mockResolvedValue({ data: mockUsers });

      const users = await UserService.getUsers();
      
      expect(mockedAxios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
      expect(users).toEqual(mockUsers);
      expect(users.length).toBe(2);
    });

    it('should throw an error when fetching users fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network Error'));

      await expect(UserService.getUsers()).rejects.toThrow('Failed to fetch users');
    });
  });

  describe('getUserById', () => {
    it('should fetch a user by id successfully', async () => {
      const mockUser = { 
        id: 1, 
        name: 'John Doe', 
        email: 'john@example.com', 
        username: 'johndoe' 
      };

      mockedAxios.get.mockResolvedValue({ data: mockUser });

      const user = await UserService.getUserById(1);
      
      expect(mockedAxios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1');
      expect(user).toEqual(mockUser);
    });

    it('should throw an error when fetching a user fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('User not found'));

      await expect(UserService.getUserById(999)).rejects.toThrow('Failed to fetch user with id 999');
    });

    it('should throw an error when id is invalid', async () => {
      await expect(UserService.getUserById(-1)).rejects.toThrow('Failed to fetch user with id -1');
    });
  });

  describe('getUsers with empty response', () => {
    it('should return an empty array when no users are found', async () => {
      mockedAxios.get.mockResolvedValue({ data: [] });

      const users = await UserService.getUsers();
      
      expect(mockedAxios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
      expect(users).toEqual([]);
      expect(users.length).toBe(0);
    });
  });
});