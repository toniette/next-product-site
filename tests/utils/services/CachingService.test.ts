import { CachingService } from '@utils/services/CachingService';

describe('CachingService', () => {
  it('should set and get cached data', () => {
    // arrange
    const cachingService = CachingService.getInstance();
    const cache_key = 'test_key';
    const cache_value = 'test_value';

    // act
    cachingService.set(cache_key, cache_value);
    const storedValue = cachingService.get(cache_key);

    // assert
    expect(storedValue).toBe(cache_value);
  });

  it('should clear cached data', () => {
    // arrange
    const cachingService = CachingService.getInstance();
    const cache_key = 'test_key';
    const cache_value = 'test_value';

    // act
    cachingService.set(cache_key, cache_value);
    cachingService.clear();

    // assert
    expect(cachingService.get(cache_key)).toBeUndefined();
  });

  it('should delete cached data', () => {
    // arrange
    const cachingService = CachingService.getInstance();
    const cache_key = 'test_key';
    const cache_value = 'test_value';

    // act
    cachingService.set(cache_key, cache_value);
    cachingService.delete(cache_key);

    // assert
    expect(cachingService.get(cache_key)).toBeUndefined();
  });

  it('should set and get cached data with expiry', async () => {
    // arrange
    const cachingService = CachingService.getInstance();
    const cache_key = 'test_key';
    const cache_value = 'test_value';

    // act
    await cachingService.set(cache_key, cache_value, 1000000);
    const storedValue = await cachingService.get(cache_key);

    // assert
    expect(storedValue).toBe(cache_value);
  });

  it('should forget cached data', async () => {
    // arrange
    const cachingService = CachingService.getInstance();
    const cache_key = 'test_key';
    const cache_value = 'test_value';

    // act
    await cachingService.set(cache_key, cache_value, 1000000);
    await cachingService.forget(cache_key);

    // assert
    expect(cachingService.get(cache_key)).toBeUndefined();
  });

  it('should remember cached data', async () => {
    // arrange
    const cachingService = CachingService.getInstance();
    const cache_key = 'test_key';
    const cache_value = 'test_value';

    // act
    const storedValue = await cachingService.remember(cache_key, async () => {
      return cache_value;
    });

    // assert
    expect(storedValue).toBe(cache_value);
  });

  it('should remember cached data with expiry', async () => {
    // arrange
    const cachingService = CachingService.getInstance();
    const cache_key = 'test_key';
    const cache_value = 'test_value';

    // act
    const storedValue = await cachingService.remember(
      cache_key,
      async () => {
        return cache_value;
      },
      1000000
    );

    // assert
    expect(storedValue).toBe(cache_value);
  });

  it('should return undefined for expired cached data', async () => {
    // arrange
    const cachingService = CachingService.getInstance();
    const cache_key = 'test_key';
    const cache_value = 'test_value';

    // act
    await cachingService.set(cache_key, cache_value, 1);
    await new Promise((resolve) => setTimeout(resolve, 2));

    // assert
    expect(await cachingService.get(cache_key)).toBeUndefined();
  });
});
