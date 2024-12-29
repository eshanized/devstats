import { CACHE_CONFIG } from './config';
import type { CachedData, LanguageCache, UserCache } from './types';

export class StorageService {
  static get<T>(key: string): CachedData<T> | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  static set<T>(key: string, data: T): void {
    try {
      const cached: CachedData<T> = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(key, JSON.stringify(cached));
    } catch (error) {
      console.warn('Failed to cache data:', error);
    }
  }

  static isExpired(timestamp: number, maxAge: number): boolean {
    return Date.now() - timestamp > maxAge;
  }

  static getUserKey(username: string): string {
    return `${CACHE_CONFIG.KEYS.USER_DATA}_${username}`;
  }

  static getLanguageKey(repoId: number): string {
    return `${CACHE_CONFIG.KEYS.LANGUAGE_DATA}_${repoId}`;
  }
}