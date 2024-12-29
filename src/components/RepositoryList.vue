<script setup lang="ts">
import { ref, computed } from 'vue';
import type { GitHubRepo } from '../types/github';
import RepositoryCard from './RepositoryCard.vue';

const props = defineProps<{
  repositories: GitHubRepo[];
}>();

const sortBy = ref('updated');
const sortOrder = ref('desc');
const filterLanguage = ref('');
const searchQuery = ref('');

const languages = computed(() => {
  const langs = new Set<string>();
  props.repositories.forEach(repo => {
    if (repo.language) langs.add(repo.language);
  });
  return Array.from(langs).sort();
});

const filteredAndSortedRepos = computed(() => {
  let filtered = props.repositories;

  if (searchQuery.value) {
    filtered = filtered.filter(repo => 
      repo.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (repo.description?.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
  }

  if (filterLanguage.value) {
    filtered = filtered.filter(repo => repo.language === filterLanguage.value);
  }

  return filtered.sort((a, b) => {
    const modifier = sortOrder.value === 'desc' ? -1 : 1;
    switch (sortBy.value) {
      case 'stars':
        return (a.stargazers_count - b.stargazers_count) * modifier;
      case 'forks':
        return (a.forks_count - b.forks_count) * modifier;
      case 'updated':
        return (new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()) * modifier;
      default:
        return 0;
    }
  });
});
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search repositories..."
        class="w-full md:w-64 px-4 py-2 rounded-lg bg-github-dark border border-github-border text-github-text"
      />
      <div class="flex gap-4">
        <select
          v-model="filterLanguage"
          class="px-4 py-2 rounded-lg bg-github-dark border border-github-border text-github-text"
        >
          <option value="">All Languages</option>
          <option v-for="lang in languages" :key="lang" :value="lang">
            {{ lang }}
          </option>
        </select>
        <select
          v-model="sortBy"
          class="px-4 py-2 rounded-lg bg-github-dark border border-github-border text-github-text"
        >
          <option value="updated">Last Updated</option>
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
        </select>
        <button
          @click="sortOrder = sortOrder === 'desc' ? 'asc' : 'desc'"
          class="px-4 py-2 rounded-lg bg-github-dark border border-github-border text-github-text"
        >
          {{ sortOrder.toUpperCase() }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <RepositoryCard
        v-for="repo in filteredAndSortedRepos"
        :key="repo.id"
        :repo="repo"
      />
    </div>
  </div>
</template>