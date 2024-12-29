<script setup lang="ts">
import { ref } from 'vue';
import { getUser, getUserRepos, getUserLanguages } from './services/github';
import UserProfile from './components/UserProfile.vue';
import UserRanking from './components/UserRanking.vue';
import RepositoryList from './components/RepositoryList.vue';
import LanguageStats from './components/languages/LanguageStats.vue';
import ActivityGraph from './components/ActivityGraph.vue';
import TopicCloud from './components/TopicCloud.vue';
import type { GitHubUser, GitHubRepo } from './types/github';

const username = ref('');
const user = ref<GitHubUser | null>(null);
const repositories = ref<GitHubRepo[]>([]);
const languages = ref<Record<string, number>>({});
const loading = ref(false);
const error = ref('');

const searchUser = async () => {
  if (!username.value) return;
  
  loading.value = true;
  error.value = '';
  
  try {
    const userData = await getUser(username.value);
    const reposData = await getUserRepos(username.value);
    const languagesData = await getUserLanguages(username.value);
    
    user.value = userData;
    repositories.value = reposData;
    languages.value = languagesData;
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to fetch user data';
    user.value = null;
    repositories.value = [];
    languages.value = {};
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-github-dark text-github-text p-4 md:p-8">
    <div class="max-w-7xl mx-auto space-y-8">
      <div class="flex flex-col items-center gap-4">
        <h1 class="text-4xl font-bold">GitHub Analytics</h1>
        <div class="w-full max-w-md">
          <div class="flex gap-2">
            <input
              v-model="username"
              type="text"
              placeholder="Enter GitHub username"
              @keyup.enter="searchUser"
              class="flex-1 px-4 py-2 rounded-lg bg-github-dark-secondary border border-github-border text-github-text"
            />
            <button
              @click="searchUser"
              :disabled="loading"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {{ loading ? 'Loading...' : 'Search' }}
            </button>
          </div>
          <p v-if="error" class="mt-2 text-red-500">{{ error }}</p>
        </div>
      </div>

      <template v-if="user">
        <UserProfile :user="user" />
        <UserRanking :user="user" />
        
        <ActivityGraph :repositories="repositories" />
        
        <div v-if="Object.keys(languages).length">
          <LanguageStats :languages="languages" />
        </div>
        
        <TopicCloud :repositories="repositories" />
        
        <div class="bg-github-dark-secondary rounded-lg p-6">
          <h2 class="text-xl font-bold mb-4">Repositories</h2>
          <RepositoryList :repositories="repositories" />
        </div>
      </template>
    </div>
  </div>
</template>