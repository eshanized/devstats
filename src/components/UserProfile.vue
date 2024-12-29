<script setup lang="ts">
import { format } from 'date-fns';
import type { GitHubUser } from '../types/github';

defineProps<{
  user: GitHubUser;
}>();
</script>

<template>
  <div class="bg-github-dark-secondary rounded-lg p-6 shadow-xl">
    <div class="flex flex-col md:flex-row items-center gap-6">
      <img
        :src="user.avatar_url"
        :alt="user.login"
        class="w-32 h-32 rounded-full"
      />
      <div class="flex-1">
        <h2 class="text-2xl font-bold text-github-text">{{ user.name }}</h2>
        <p class="text-gray-400">@{{ user.login }}</p>
        <p v-if="user.bio" class="mt-2 text-github-text">{{ user.bio }}</p>
        <div class="mt-4 flex flex-wrap gap-4">
          <div class="flex items-center gap-2">
            <span class="text-gray-400">Joined</span>
            <span class="text-github-text">{{ format(new Date(user.created_at), 'MMM d, yyyy') }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-gray-400">Repositories</span>
            <span class="text-github-text">{{ user.public_repos }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-gray-400">Followers</span>
            <span class="text-github-text">{{ user.followers }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-gray-400">Following</span>
            <span class="text-github-text">{{ user.following }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>