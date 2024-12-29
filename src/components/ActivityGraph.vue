<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import type { GitHubRepo } from '../types/github';
import { format, subMonths, eachMonthOfInterval } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const props = defineProps<{
  repositories: GitHubRepo[];
}>();

const activityData = computed(() => {
  const now = new Date();
  const sixMonthsAgo = subMonths(now, 6);
  const months = eachMonthOfInterval({ start: sixMonthsAgo, end: now });
  
  const monthlyActivity = months.map(month => {
    const monthStr = format(month, 'MMM yyyy');
    const count = props.repositories.filter(repo => {
      const updatedDate = new Date(repo.updated_at);
      return format(updatedDate, 'MMM yyyy') === monthStr;
    }).length;
    return { month: monthStr, count };
  });

  return {
    labels: monthlyActivity.map(m => m.month),
    datasets: [{
      label: 'Repository Updates',
      data: monthlyActivity.map(m => m.count),
      borderColor: '#58a6ff',
      backgroundColor: 'rgba(88, 166, 255, 0.1)',
      fill: true,
    }]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: { color: '#8b949e' }
    },
    x: {
      ticks: { color: '#8b949e' }
    }
  },
  plugins: {
    legend: {
      labels: { color: '#c9d1d9' }
    }
  }
};
</script>

<template>
  <div class="bg-github-dark-secondary rounded-lg p-6">
    <h2 class="text-xl font-bold mb-4">Activity Overview</h2>
    <div class="h-[300px]">
      <Line :data="activityData" :options="chartOptions" />
    </div>
  </div>
</template>