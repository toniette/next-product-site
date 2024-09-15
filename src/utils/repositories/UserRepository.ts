import { UserRepositoryInterface } from '@type/users/UserRepositoryInterface';
import usersLarge from '@mock/large/users.json';
import { User } from '@type/users';
import { Order } from '@type/orders';
import { OrderRepository } from '@utils/repositories/OrderRepository';

export class UserRepository implements UserRepositoryInterface {
  static dataSet: Map<string, User>;
  static expiresAt = 60 * 60;
  static lastUpdated: number;

  constructor() {
    let isExpired = Date.now() - UserRepository.lastUpdated > UserRepository.expiresAt;
    if (!UserRepository.dataSet || isExpired) {
      UserRepository.dataSet = new Map(usersLarge.map((user) => [user.id, user]));
    }
  }

  create(entity: User): Promise<User> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  get(id: string): Promise<User> {
    return Promise.resolve(UserRepository.dataSet.get(id) as User);
  }

  getAll(): Promise<User[]> {
    return Promise.resolve(Array.from(UserRepository.dataSet.values()) as User[]);
  }

  getByEmail(email: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }

  getByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }

  update(id: string, entity: User): Promise<User> {
    throw new Error('Method not implemented.');
  }

  getOrders(id: string): Promise<Order[]> {
    let orderRepository = new OrderRepository();
    return Promise.resolve(orderRepository.getByUser(id));
  }

  getSpends(id: string): Promise<number> {
    let orderRepository = new OrderRepository();
    return Promise.resolve(orderRepository.getSpendsByUser(id) || 0);
  }
}
