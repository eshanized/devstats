<script setup lang="ts">
import { computed } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { ChartData } from 'chart.js';
import type { LanguageStats } from '../../services/languageService';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps<{
  languages: LanguageStats[];
}>();

const chartData = computed<ChartData<'pie'>>(() => ({
  labels: props.languages.map(l => l.name),
  datasets: [{
    data: props.languages.map(l => l.bytes),
    backgroundColor: props.languages.map((_, i) => 
      `hsl(${i * 360 / props.languages.length}, 70%, 50%)`
    ),
  }]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        color: '#c9d1d9'
      }
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const value = context.raw;
          const percentage = (value / props.languages.reduce((sum, l) => sum + l.bytes, 0) * 100).toFixed(1);
          return `${context.label}: ${percentage}%`;
        }
      }
    }
  }
};
</script>

<template>
  <div class="h-[300px] bg-github-dark-secondary p-4 rounded-lg">
    <Pie
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>