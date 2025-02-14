import { NextRequest, NextResponse } from 'next/server';
import { UserRepository } from '@utils/repositories/UserRepository';
import { CachingService } from '@utils/services/CachingService';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const cache_key = `user_${id}`;
  const cachingService = CachingService.getInstance();

  const user = await cachingService.remember(cache_key, async () => {
    const userRepository = new UserRepository();
    return await userRepository.get(id);
  });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}
