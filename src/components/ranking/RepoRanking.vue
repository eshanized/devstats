<script setup lang="ts">
import { computed } from 'vue';
import type { GitHubRepo } from '../../types/github';
import RankBadge from './RankBadge.vue';
import { calculateRepoTier, calculateRepoScore, getRepoPercentile } from '../../utils/repoRankingCalculator';

const props = defineProps<{
  repo: GitHubRepo;
}>();

const repoScore = computed(() => 
  calculateRepoScore(props.repo.stargazers_count, props.repo.forks_count)
);

const repoTier = computed(() => 
  calculateRepoTier(props.repo.stargazers_count, props.repo.forks_count)
);

const percentile = computed(() => 
  getRepoPercentile(repoScore.value)
);
</script>

<template>
  <div class="flex items-center gap-2">
    <RankBadge :tier="repoTier" />
    <span class="text-sm text-gray-400">
      Top {{ percentile.toFixed(1) }}%
    </span>
  </div>
</template>