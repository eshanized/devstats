<script setup lang="ts">
import { computed } from 'vue';
import type { GitHubRepo } from '../types/github';

const props = defineProps<{
  repositories: GitHubRepo[];
}>();

const topTopics = computed(() => {
  const topicCount = new Map<string, number>();
  
  props.repositories.forEach(repo => {
    repo.topics?.forEach(topic => {
      topicCount.set(topic, (topicCount.get(topic) || 0) + 1);
    });
  });
  
  return Array.from(topicCount.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20)
    .map(([topic, count]) => ({
      topic,
      count,
      size: Math.max(0.8, Math.min(2, 0.8 + count * 0.2))
    }));
});
</script>

<template>
  <div class="bg-github-dark-secondary rounded-lg p-6">
    <h2 class="text-xl font-bold mb-4">Popular Topics</h2>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="{ topic, count, size } in topTopics"
        :key="topic"
        class="px-3 py-1 rounded-full bg-github-dark border border-github-border"
        :style="{
          fontSize: `${size}rem`,
          opacity: 0.7 + (count * 0.1)
        }"
      >
        {{ topic }}
        <span class="text-xs ml-1 text-gray-400">({{ count }})</span>
      </span>
    </div>
  </div>
</template>