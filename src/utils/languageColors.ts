export const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Ruby: '#701516',
  PHP: '#4F5D95',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  Go: '#00ADD8',
  Rust: '#dea584',
  Shell: '#89e051',
  Vue: '#41b883',
  // Add more languages as needed
  default: '#4A4A4A'
};

export const getLanguageColor = (language: string | null): string => {
  if (!language) return languageColors.default;
  return languageColors[language] || languageColors.default;
};