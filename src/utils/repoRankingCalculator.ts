// Approximate statistics for GitHub repositories (as of 2024)
const REPO_STATS = {
  TOTAL_REPOS: 200_000_000, // Approximate total public repos
  STAR_THRESHOLDS: {
    ELITE: 1000,    // Top 0.1%
    MASTER: 100,    // Top 1%
    EXPERT: 50,     // Top 5%
    ADVANCED: 10,   // Top 15%
  },
  FORK_THRESHOLDS: {
    ELITE: 100,     // Top 0.1%
    MASTER: 50,     // Top 1%
    EXPERT: 20,     // Top 5%
    ADVANCED: 5,    // Top 15%
  }
};

export const calculateRepoTier = (stars: number, forks: number): string => {
  if (stars >= REPO_STATS.STAR_THRESHOLDS.ELITE || forks >= REPO_STATS.FORK_THRESHOLDS.ELITE) {
    return 'Elite';
  }
  if (stars >= REPO_STATS.STAR_THRESHOLDS.MASTER || forks >= REPO_STATS.FORK_THRESHOLDS.MASTER) {
    return 'Master';
  }
  if (stars >= REPO_STATS.STAR_THRESHOLDS.EXPERT || forks >= REPO_STATS.FORK_THRESHOLDS.EXPERT) {
    return 'Expert';
  }
  if (stars >= REPO_STATS.STAR_THRESHOLDS.ADVANCED || forks >= REPO_STATS.FORK_THRESHOLDS.ADVANCED) {
    return 'Advanced';
  }
  return 'Active';
};

export const calculateRepoScore = (stars: number, forks: number): number => {
  // Weight: Stars (70%) + Forks (30%)
  return (stars * 0.7) + (forks * 0.3);
};

export const getRepoPercentile = (score: number): number => {
  // Simplified percentile calculation based on score
  const maxScore = REPO_STATS.STAR_THRESHOLDS.ELITE;
  return Math.min(99.9, (score / maxScore) * 100);
};