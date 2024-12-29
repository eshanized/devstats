<script setup lang="ts">
import RankBadge from './RankBadge.vue';
import { calculatePercentileRank, getRankTier, formatRank } from '../../utils/rankingCalculator';

const props = defineProps<{
  label: string;
  value: number;
  total: number;
  description: string;
}>();

const percentile = calculatePercentileRank(props.value, props.total);
const tier = getRankTier(percentile);
const rank = Math.round((props.total * percentile) / 100);
</script>

<template>
  <div class="p-4 bg-github-dark rounded-lg border border-github-border">
    <div class="flex justify-between items-start mb-2">
      <h3 class="text-lg font-semibold text-github-text">{{ label }}</h3>
      <RankBadge :tier="tier" />
    </div>
    <div class="mt-2 text-3xl font-bold text-blue-400">
      Top {{ formatRank(rank) }}
    </div>
    <p class="text-sm text-gray-400 mt-1">{{ description }}</p>
    <div class="mt-2 text-sm text-gray-400">
      Better than {{ (100 - percentile).toFixed(1) }}% of users
    </div>
  </div>
</template>