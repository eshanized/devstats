<script setup lang="ts">
import { computed } from 'vue';
import { format } from 'date-fns';
import type { GitHubRepo } from '../types/github';
import { getLanguageColor } from '../utils/languageColors';
import RepoRanking from './ranking/RepoRanking.vue';

const props = defineProps<{
  repo: GitHubRepo;
}>();

const languageColor = computed(() => getLanguageColor(props.repo.language));

const repoPreviewUrl = computed(() => 
  `https://opengraph.githubassets.com/1/${props.repo.full_name}`
);
</script>

<template>
  <div class="bg-github-dark-secondary rounded-lg border border-github-border overflow-hidden">
    <img 
      :src="repoPreviewUrl" 
      :alt="repo.name"
      class="w-full h-40 object-cover border-b border-github-border"
      loading="lazy"
    />
    <div class="p-4">
      <div class="flex justify-between items-start">
        <a
          :href="repo.html_url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-400 hover:underline text-lg font-semibold"
        >
          {{ repo.name }}
        </a>
        <RepoRanking :repo="repo" />
      </div>
      <p v-if="repo.description" class="text-github-text mt-2 line-clamp-2">
        {{ repo.description }}
      </p>
      <div class="mt-4 flex flex-wrap gap-4 text-sm">
        <span v-if="repo.language" class="flex items-center gap-1.5">
          <span 
            class="w-3 h-3 rounded-full inline-block"
            :style="{ backgroundColor: languageColor }"
          ></span>
          <span class="text-github-text">{{ repo.language }}</span>
        </span>
        <span class="text-github-text">⭐ {{ repo.stargazers_count }}</span>
        <span class="text-github-text">🔱 {{ repo.forks_count }}</span>
        <span class="text-github-text">
          Updated {{ format(new Date(repo.updated_at), 'MMM d, yyyy') }}
        </span>
      </div>
    </div>
  </div>
</template>