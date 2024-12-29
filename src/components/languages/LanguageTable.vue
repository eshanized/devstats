<script setup lang="ts">
import { getLanguageColor } from '../../utils/languageColors';
import { formatBytes } from '../../utils/formatters';
import type { LanguageStats } from '../../services/languageService';

defineProps<{
  languages: LanguageStats[];
}>();
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr class="text-left border-b border-github-border">
          <th class="pb-2">Language</th>
          <th class="pb-2">Size</th>
          <th class="pb-2">%</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="lang in languages" 
          :key="lang.name"
          class="border-b border-github-border last:border-0"
        >
          <td class="py-2">
            <div class="flex items-center gap-2">
              <span 
                class="w-3 h-3 rounded-full inline-block"
                :style="{ backgroundColor: getLanguageColor(lang.name) }"
              ></span>
              {{ lang.name }}
            </div>
          </td>
          <td class="py-2">{{ formatBytes(lang.bytes) }}</td>
          <td class="py-2">{{ lang.percentage.toFixed(1) }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>