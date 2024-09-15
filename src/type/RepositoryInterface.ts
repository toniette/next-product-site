export interface RepositoryInterface<T> {
  get: (id: string) => Promise<T>;
  getAll: () => Promise<T[]>;
  create: (entity: T) => Promise<T>;
  update: (id: string, entity: T) => Promise<T>;
  delete: (id: string) => Promise<void>;
}
