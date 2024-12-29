<script setup lang="ts">
import { computed } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { ChartData } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps<{
  languages: Record<string, number>;
}>();

const chartData = computed<ChartData<'pie'>>(() => {
  const labels = Object.keys(props.languages);
  const data = Object.values(props.languages);
  
  return {
    labels,
    datasets: [{
      data,
      backgroundColor: labels.map((_, i) => `hsl(${i * 360 / labels.length}, 70%, 50%)`),
    }]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        color: '#c9d1d9'
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