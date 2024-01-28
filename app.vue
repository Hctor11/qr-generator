<script setup>
const colorMode = useColorMode()

import CodeContainer from '~/components/CodeContainer.vue';

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <nav class="flex p-2 justify-between flex-row-reverse border-b md:mb-12">
    <ClientOnly>
      <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="gray" variant="ghost"
        aria-label="Theme" @click="isDark = !isDark" />

      <template #fallback>
        <div class="w-8 h-8" />
      </template>
    </ClientOnly>

    <a href="/">
      <NuxtImg src="/images/logo.svg" width="200" height="200"
        class="rounded pointer-events-none dark:filter dark:invert transition-all" />
    </a>
  </nav>
  <CodeContainer />
</template>

<style scoped>
::selection {
  background-color: rgb(61, 61, 61);
  color: white;
}

* {
  font-family: 'Work Sans';
}
</style>
