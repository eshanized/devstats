import axios from 'axios';
import type { GitHubUser, GitHubRepo } from '../types/github';
import { fetchAllRepoLanguages } from './languageService';
import { StorageService } from './storage/storageService';
import { CACHE_CONFIG } from './storage/config';

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  }
});

// Add rate limit handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 403) {
      const rateLimitReset = error.response.headers['x-ratelimit-reset'];
      const resetDate = rateLimitReset ? new Date(Number(rateLimitReset) * 1000) : null;
      const message = resetDate 
        ? `Rate limit exceeded. Resets at ${resetDate.toLocaleTimeString()}`
        : 'Rate limit exceeded. Please try again later.';
      throw new Error(message);
    }
    throw error;
  }
);

export const getUser = async (username: string): Promise<GitHubUser> => {
  const cacheKey = StorageService.getUserKey(username);
  const cached = StorageService.get<GitHubUser>(cacheKey);

  if (cached && !StorageService.isExpired(cached.timestamp, CACHE_CONFIG.USER_CACHE_TIME)) {
    return cached.data;
  }

  const { data } = await api.get(`/users/${username}`);
  StorageService.set(cacheKey, data);
  return data;
};

export const getUserRepos = async (username: string): Promise<GitHubRepo[]> => {
  const cacheKey = `${StorageService.getUserKey(username)}_repos`;
  const cached = StorageService.get<GitHubRepo[]>(cacheKey);

  if (cached && !StorageService.isExpired(cached.timestamp, CACHE_CONFIG.REPO_CACHE_TIME)) {
    return cached.data;
  }

  const { data } = await api.get(`/users/${username}/repos?sort=updated&per_page=100`);
  StorageService.set(cacheKey, data);
  return data;
};

export const getUserLanguages = async (username: string): Promise<Record<string, number>> => {
  const repos = await getUserRepos(username);
  return fetchAllRepoLanguages(repos, api);
};