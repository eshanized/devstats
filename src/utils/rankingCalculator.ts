// Approximate total GitHub users: 100 million (as of 2024)
const TOTAL_GITHUB_USERS = 100_000_000;

export const calculatePercentileRank = (value: number, total: number): number => {
  return 100 - ((value / total) * 100);
};

export const getRankTier = (percentile: number): string => {
  if (percentile <= 1) return 'Elite';
  if (percentile <= 5) return 'Master';
  if (percentile <= 10) return 'Expert';
  if (percentile <= 25) return 'Advanced';
  return 'Active';
};

export const formatRank = (rank: number): string => {
  return rank.toLocaleString('en-US', { maximumFractionDigits: 0 });
};