import { NextRequest, NextResponse } from 'next/server';
import { OrderRepository } from '@utils/repositories/OrderRepository';
import { CachingService } from '@utils/services/CachingService';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const cache_key = `user_${id}_orders`;
  const cachingService = CachingService.getInstance();

  const orders = await cachingService.remember(cache_key, async () => {
    const orderRepository = new OrderRepository();
    return await orderRepository.getByUser(id);
  });

  if (!orders) {
    return NextResponse.json([]);
  }

  return NextResponse.json(orders);
}
