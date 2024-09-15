import { User } from '@type/users';
import { Order } from '@type/orders';
import { OrderRepositoryInterface } from '@type/orders/OrderRepositoryInterface';
import ordersLarge from '@mock/large/orders.json';
import { UserRepository } from '@utils/repositories/UserRepository';

export class OrderRepository implements OrderRepositoryInterface {
  static dataSet: Map<string, Order[]>;
  static spends: Map<string, number>;
  static expiresAt = 60 * 60;
  static lastUpdated: number;

  constructor() {
    let isExpired = Date.now() - OrderRepository.lastUpdated > OrderRepository.expiresAt;
    if (!OrderRepository.dataSet || isExpired) {
      const ordersMap = new Map<string, Order[]>();

      OrderRepository.dataSet = new Map<string, Order[]>();
      OrderRepository.spends = new Map<string, number>();

      ordersLarge.forEach((order: Order) => {
        const userOrders = ordersMap.get(order.user) || [];
        OrderRepository.spends.set(order.user, (OrderRepository.spends.get(order.user) || 0) + order.total);
        userOrders.push(order);
        ordersMap.set(order.user, userOrders);
      });

      OrderRepository.dataSet = ordersMap;
      OrderRepository.lastUpdated = Date.now();
    }
  }

  create(entity: Order): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  get(id: string): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  getAll(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }

  update(id: string, entity: Order): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  getUser(id: string): Promise<User> {
    let userRepository = new UserRepository();
    return Promise.resolve(userRepository.get(id));
  }

  getByUser(userId: string): Promise<Order[]> {
    return Promise.resolve(OrderRepository.dataSet.get(userId) || []);
  }

  getSpendsByUser(userId: string): Promise<number> {
    return Promise.resolve(OrderRepository.spends.get(userId) || 0);
  }
}
