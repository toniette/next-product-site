import { OrderRepository } from '@utils/repositories/OrderRepository';

describe('OrderRepository', () => {
  it('should build the data set on construct', () => {
    // arrange
    const orderRepository = new OrderRepository();

    // act
    const dataSet = OrderRepository.dataSet;

    // assert
    expect(dataSet.size).toBeGreaterThan(0);
  });

  it('should get all orders from a specific user', async () => {
    // arrange
    const orderRepository = new OrderRepository();
    const userId = 'a85312c0-6b44-495b-b878-9cc31004bbf7';

    // act
    const orders = await orderRepository.getByUser(userId);

    // assert
    expect(orders.length).toBeGreaterThan(0);
  });

  it('should get the total spends of a specific user', async () => {
    // arrange
    const orderRepository = new OrderRepository();
    const userId = 'a85312c0-6b44-495b-b878-9cc31004bbf7';

    // act
    const totalSpends = await orderRepository.getSpendsByUser(userId);

    // assert
    expect(totalSpends).toEqual(207448);
  });

  it('should get all orders of a specific user', async () => {
    // arrange
    const orderRepository = new OrderRepository();
    const userId = 'a85312c0-6b44-495b-b878-9cc31004bbf7';
    const expectedOrdersCount = 45;

    // act
    const orders = await orderRepository.getByUser(userId);

    // assert
    expect(orders.length).toEqual(45);
  });
});
