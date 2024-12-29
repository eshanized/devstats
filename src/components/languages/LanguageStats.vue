<script setup lang="ts">
import { computed } from 'vue';
import LanguageChart from './LanguageChart.vue';
import LanguageTable from './LanguageTable.vue';
import type { LanguageStats } from '../../services/languageService';

const props = defineProps<{
  languages: LanguageStats[];
}>();

const totalBytes = computed(() => 
  props.languages.reduce((sum, lang) => sum + lang.bytes, 0)
);
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-github-dark-secondary rounded-lg p-6">
        <h3 class="text-xl font-bold mb-4">Language Distribution</h3>
        <LanguageChart :languages="languages" />
      </div>
      
      <div class="bg-github-dark-secondary rounded-lg p-6">
        <h3 class="text-xl font-bold mb-4">Language Breakdown</h3>
        <LanguageTable :languages="languages" />
      </div>
    </div>
  </div>
</template>