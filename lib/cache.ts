interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class Cache {
  private cache = new Map<string, CacheItem<any>>();
  private readonly expiry: number;

  constructor(expiryMinutes: number = 5) {
    this.expiry = expiryMinutes * 60 * 1000;
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const pageCache = new Cache(5); // 5分のキャッシュ 