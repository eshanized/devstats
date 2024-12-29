import type { AxiosInstance } from 'axios';
import type { GitHubRepo } from '../types/github';
import { StorageService } from './storage/storageService';
import { CACHE_CONFIG } from './storage/config';
import { getErrorMessage } from '../utils/errorLogger';

export interface RepoLanguages {
  [key: string]: number;
}

export interface LanguageStats {
  name: string;
  bytes: number;
  percentage: number;
}

const calculatePercentages = (
  languageBytes: Record<string, number>, 
  totalBytes: number
): LanguageStats[] => {
  return Object.entries(languageBytes)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: (bytes / totalBytes) * 100
    }))
    .sort((a, b) => b.bytes - a.bytes);
};

export const fetchRepoLanguages = async (
  repo: GitHubRepo, 
  api: AxiosInstance
): Promise<RepoLanguages | null> => {
  const cacheKey = StorageService.getLanguageKey(repo.id);
  const cached = StorageService.get<RepoLanguages>(cacheKey);

  if (cached && !StorageService.isExpired(cached.timestamp, CACHE_CONFIG.LANGUAGE_CACHE_TIME)) {
    return cached.data;
  }

  try {
    const { data } = await api.get<RepoLanguages>(repo.languages_url);
    StorageService.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching languages for ${repo.name}: ${getErrorMessage(error)}`);
    return null;
  }
};

export const fetchAllRepoLanguages = async (
  repos: GitHubRepo[],
  api: AxiosInstance
): Promise<LanguageStats[]> => {
  const languageBytes: Record<string, number> = {};
  let totalBytes = 0;
  
  // Process repos in smaller batches
  const BATCH_SIZE = 10;
  for (let i = 0; i < repos.length; i += BATCH_SIZE) {
    const batch = repos.slice(i, i + BATCH_SIZE);
    const results = await Promise.allSettled(
      batch.map(repo => fetchRepoLanguages(repo, api))
    );
    
    results.forEach((result) => {
      if (result.status === 'fulfilled' && result.value) {
        Object.entries(result.value).forEach(([lang, bytes]) => {
          languageBytes[lang] = (languageBytes[lang] || 0) + bytes;
          totalBytes += bytes;
        });
      }
    });
  }
  
  return calculatePercentages(languageBytes, totalBytes);
};