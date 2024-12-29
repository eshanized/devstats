<!-- Add to the error message display -->
<template>
  <!-- ... existing template code ... -->
  <p v-if="error" class="mt-2 text-red-500">
    {{ error }}
    <template v-if="error.includes('Rate limit exceeded')">
      <br>
      <span class="text-sm">
        Consider adding a GitHub token to increase rate limits.
        Create one at 
        <a 
          href="https://github.com/settings/tokens" 
          target="_blank" 
          rel="noopener"
          class="text-blue-400 hover:underline"
        >
          GitHub Settings
        </a>
      </span>
    </template>
  </p>
  <!-- ... rest of template ... -->
</template>