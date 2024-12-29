export const CACHE_CONFIG = {
  // Cache expiration times (in milliseconds)
  USER_CACHE_TIME: 5 * 60 * 1000, // 5 minutes
  REPO_CACHE_TIME: 30 * 60 * 1000, // 30 minutes
  LANGUAGE_CACHE_TIME: 24 * 60 * 60 * 1000, // 24 hours
  
  // Storage keys
  KEYS: {
    USER_DATA: 'github_user_data',
    LANGUAGE_DATA: 'github_language_data',
  }
};