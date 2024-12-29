<script setup lang="ts">
import { computed } from 'vue';
import type { GitHubUser } from '../types/github';
import RankMetric from './ranking/RankMetric.vue';

const props = defineProps<{
  user: GitHubUser;
}>();

const TOTAL_GITHUB_USERS = 100_000_000; // Approximate total GitHub users

const rankingMetrics = computed(() => ({
  followers: {
    label: 'Followers Rank',
    value: props.user.followers,
    total: TOTAL_GITHUB_USERS,
    description: 'Based on global follower count'
  },
  repositories: {
    label: 'Repository Rank',
    value: props.user.public_repos,
    total: TOTAL_GITHUB_USERS,
    description: 'Based on public repository count'
  }
}));
</script>

<template>
  <div class="bg-github-dark-secondary rounded-lg p-6">
    <h2 class="text-xl font-bold mb-4">Developer Rankings</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <RankMetric
        v-for="(metric, key) in rankingMetrics"
        :key="key"
        v-bind="metric"
      />
    </div>
    <p class="mt-4 text-sm text-gray-400">
      Rankings are approximate and based on public GitHub data as of 2024
    </p>
  </div>
</template>