<template>
  <div class="flex justify-center flex-col items-center w-9/12 md:w-2/6 m-auto py-6">
    <UInput color="blue" variant="outline" placeholder="Put your link here..." v-model="valueinput" class="w-full pb-3" />
    <div class="colors flex gap-6 w-full">
      <div class="flex gap-1">
        <label for="bg">Background:</label>
        <input type="color" name="bg" class="" v-model="background">
      </div>
      <div class="">
        <label for="bg">Foreground:</label>
        <input type="color" name="fg" class="border border-3 rounded" v-model="foreground">
      </div>
    </div>
    <div class="qrcode" ref="qrcode">
      <Qrcode class="p-3" :value="computedQrValue" :level="level" :render-as="renderAs" :margin="1" :background="background"
        :foreground="foreground" :size="324" />
    </div>
    <UButton class="my-4" color="black" icon="i-heroicons-arrow-down-tray" @click="downloadQrCode()">Download SVG</UButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Level, RenderAs } from 'qrcode.vue';
import Qrcode from 'qrcode.vue';

const valueinput = ref('');
const background = ref('#ffffff');
const foreground = ref('#000000');
const level = ref<Level>('M');
const renderAs = ref<RenderAs>('svg');
const svgContent = ref<string | null>(null);

const computedQrValue = computed(() => valueinput.value);

onMounted(() => {
  // Access the generated SVG content directly after the component is mounted
  const qrcodeElement = document.querySelector('.qrcode');
  if (qrcodeElement) {
    svgContent.value = qrcodeElement.innerHTML;
  }
});

const downloadQrCode = () => {
  if (!svgContent.value) {
    console.error('SVG content not generated');
    return;
  }

  const blob = new Blob([svgContent.value], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'qrcode.svg';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();

  // Clean up
  URL.revokeObjectURL(url);
};
</script>

<style></style>