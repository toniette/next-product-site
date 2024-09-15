import { NextRequest, NextResponse } from 'next/server';
import { UserRepository } from '@utils/repositories/UserRepository';
import { CachingService } from '@utils/services/CachingService';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const cache_key = `user_${id}`;
  const cachingService = CachingService.getInstance();

  const userSpendsValue = await cachingService.remember(cache_key, async () => {
    const userRepository = new UserRepository();
    return await userRepository.getSpends(id);
  });

  return NextResponse.json({ value: userSpendsValue });
}
