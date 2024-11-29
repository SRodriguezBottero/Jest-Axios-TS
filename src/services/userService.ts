import axios from 'axios';
import { User } from '../types/User';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const UserService = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  },

  async getUserById(id: number): Promise<User> {
    try {
      const response = await axios.get(`${BASE_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user with id ${id}`);
    }
  }
};