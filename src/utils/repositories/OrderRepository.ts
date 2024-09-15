import { User } from '@type/users';
import { Order } from '@type/orders';
import { OrderRepositoryInterface } from '@type/orders/OrderRepositoryInterface';
import ordersLarge from '@mock/large/orders.json';
import { UserRepository } from '@utils/repositories/UserRepository';
export class OrderRepository implements OrderRepositoryInterface {
  dataSet: Map<string, Order[]>;
  userRepository = new UserRepository();
  spends = new Map<string, number>();

  constructor() {
    this.dataSet = (() => {
      const ordersMap = new Map<string, Order[]>();

      ordersLarge.forEach((order: Order) => {
        const userOrders = ordersMap.get(order.user) || [];
        this.spends.set(order.user, (this.spends.get(order.user) || 0) + order.total);
        userOrders.push(order);
        ordersMap.set(order.user, userOrders);
      });

      return ordersMap;
    })();
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
    return Promise.resolve(this.userRepository.get(id));
  }

  getByUser(userId: string): Promise<Order[]> {
    return Promise.resolve(this.dataSet.get(userId) || []);
  }

  getSpendsByUser(userId: string): Promise<number> {
    return Promise.resolve(this.spends.get(userId) || 0);
  }
}
