<script setup>
const version = 2 + 1
const colorMode = useColorMode()

const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <ClientOnly>
    <UButton
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      color="gray"
      variant="ghost"
      aria-label="Theme"
      @click="isDark = !isDark"
    />

    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
  <h1 class="text-4xl font-semibold">
    QR generator
  </h1>
</template>

<style scoped>

::selection{
  background-color: rgb(61, 61, 61);
  color: white;
}
*{
  font-family: 'Work Sans';
}
</style>