import { User } from '@type/users';
import { RepositoryInterface } from '@type/RepositoryInterface';
import { Order } from '@type/orders';

export interface UserRepositoryInterface extends RepositoryInterface<User> {
  getByEmail: (email: string) => Promise<User | undefined>;
  getByPhoneNumber: (phoneNumber: string) => Promise<User | undefined>;
  getOrders: (id: string) => Promise<Order[]>;
  getSpends: (id: string) => Promise<number>;
}
