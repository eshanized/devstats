<script setup lang="ts">
defineProps<{
  tier: string;
}>();
</script>

<template>
  <span 
    class="px-2 py-1 rounded-full text-sm font-semibold"
    :class="{
      'bg-purple-600 text-white': tier === 'Elite',
      'bg-blue-600 text-white': tier === 'Master',
      'bg-green-600 text-white': tier === 'Expert',
      'bg-yellow-600 text-white': tier === 'Advanced',
      'bg-gray-600 text-white': tier === 'Active'
    }"
  >
    {{ tier }}
  </span>
</template>