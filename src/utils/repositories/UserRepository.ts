import { UserRepositoryInterface } from '@type/users/UserRepositoryInterface';
import usersLarge from '@mock/large/users.json';
import { User } from '@type/users';
import { Order } from '@type/orders';
import { OrderRepository } from '@utils/repositories/OrderRepository';

export class UserRepository implements UserRepositoryInterface {
  dataSet = new Map(usersLarge.map((user) => [user.id, user]));
  orderRepository = new OrderRepository();

  create(entity: User): Promise<User> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  get(id: string): Promise<User> {
    return Promise.resolve(this.dataSet.get(id) as User);
  }

  getAll(): Promise<User[]> {
    return Promise.resolve(Array.from(this.dataSet.values()) as User[]);
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
    return Promise.resolve(this.orderRepository.getByUser(id));
  }

  getSpends(id: string): Promise<number> {
    return Promise.resolve(this.orderRepository.getSpendsByUser(id) || 0);
  }
}
