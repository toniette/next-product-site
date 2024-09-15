import { CachingServiceRepository } from '@type/CachingServiceRepository';

export class CachingService implements CachingServiceRepository {
  dataSet = new Map<string, { data: any; expiry: number }>();

  private static instance: CachingService;

  static getInstance(): CachingService {
    if (!CachingService.instance) {
      CachingService.instance = new CachingService();
    }
    return CachingService.instance;
  }

  private constructor() {
    // This is a private constructor to prevent creating a new instance of the class
  }

  clear(): Promise<void> {
    this.dataSet.clear();
    return Promise.resolve(undefined);
  }

  delete(key: string): Promise<void> {
    this.dataSet.delete(key);
    return Promise.resolve(undefined);
  }

  forever(key: string, value: any): Promise<void> {
    this.dataSet.set(key, { data: value, expiry: Number.MAX_SAFE_INTEGER });
    return Promise.resolve(undefined);
  }

  forget(key: string): Promise<void> {
    this.dataSet.delete(key);
    return Promise.resolve(undefined);
  }

  get(key: string): Promise<any> {
    const storedValue = this.dataSet.get(key);

    if (storedValue === undefined) {
      return Promise.resolve(undefined);
    }

    if (storedValue.expiry < Date.now()) {
      this.dataSet.delete(key);
      return Promise.resolve(undefined);
    }

    return Promise.resolve(storedValue.data);
  }

  async remember(key: string, callback: () => Promise<any>, expiry: number = 3000): Promise<any> {
    const storedValue = await this.get(key);
    if (storedValue !== undefined && storedValue.expiry > Date.now()) {
      return Promise.resolve(storedValue);
    }
    const newValue = await callback();
    await this.set(key, newValue, expiry);
    return Promise.resolve(newValue);
  }

  set(key: string, value: any, expiry: number = 3000): Promise<void> {
    this.dataSet.set(key, { data: value, expiry: Date.now() + expiry });
    return Promise.resolve(undefined);
  }
}
