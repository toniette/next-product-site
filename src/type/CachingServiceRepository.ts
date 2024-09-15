export interface CachingServiceRepository {
  get(key: string): Promise<any>;
  remember(key: string, callback: () => Promise<any>, expiry: number): Promise<any>;
  forever(key: string, value: any): Promise<void>;
  forget(key: string): Promise<void>;
  set(key: string, value: any, expiry: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}
