export interface CachedData<T> {
  data: T;
  timestamp: number;
}

export interface LanguageCache {
  [repoId: number]: {
    languages: Record<string, number>;
    timestamp: number;
  };
}

export interface UserCache {
  [username: string]: {
    data: any;
    repos: any[];
    timestamp: number;
  };
}