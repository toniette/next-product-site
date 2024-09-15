import { RepositoryInterface } from '@type/RepositoryInterface';
import { Order } from '@type/orders';
import { User } from '@type/users';

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {
  getUser: (id: string) => Promise<User>;
  getByUser: (userId: string) => Promise<Order[]>;
  getSpendsByUser: (userId: string) => Promise<number>;
}
