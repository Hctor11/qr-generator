<template>
  <div class="flex justify-center flex-col items-start w-9/12 md:flex-row m-auto py-6">
    <div class="input-set m-2 flex-col">
      <UTextarea :rows="4" color="blue" variant="outline" placeholder="Put your link here..." v-model="valueinput"
        class="w-full pb-3" />
      <div class="colors flex-col md:flex-row flex gap-6 w-full">
        <div class="flex gap-1">
          <label for="bg">Background:</label>
          <input type="color" name="bg" class="" v-model="background">
        </div>
        <div class="">
          <label for="bg">Foreground:</label>
          <input type="color" name="fg" class="border border-3 rounded" v-model="foreground">
        </div>
      </div>

      <div class="md:mt-12">
        <p class="text-sm opacity-50">examples</p>

        <button class="border hover:bg-zinc-100 rounded-md mb-2 flex items-center h-15 w-full" @click="setValueInput('https://www.youtube.com/watch?v=dQw4w9WgXcQ')">
          <div class="image">
            <NuxtImg src="/images/rick.jpg" width="60" />
          </div>
          <div class="text">
            <h2 class="p-1 font-normal text-sm">Rick Astley - Never Gonna Give You Up (Official Music Video)</h2>
          </div>
        </button>

        <button class="border hover:bg-zinc-100 rounded-md flex items-center h-15 w-full" @click="setValueInput('https://www.youtube.com/watch?v=jNQXAC9IVRw')">
          <div class="image">
            <NuxtImg src="/images/MeZoo.jpg" width="60" />
          </div>
          <div class="text">
            <h2 class="p-3 font-normal text-sm">Me at the zoo</h2>
          </div>
        </button>

      </div>

    </div>

    <div class="qr-button">
      <div class="qrcode border" ref="qrcode">
        <Qrcode class="qrcode" :value="computedQrValue" :level="level" :render-as="renderAs" :margin="1"
          :background="background" :foreground="foreground" :size="324" />
      </div>
      <UButton block class="my-4" color="black" icon="i-heroicons-arrow-down-tray" @click="downloadQrCode()">Download SVG
      </UButton>
    </div>
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

const generateSvgContent = () => {
  const qrcodeElement = document.querySelector('.qrcode');
  if (qrcodeElement) {
    svgContent.value = qrcodeElement.innerHTML;
  }
};

onMounted(() => {
  // Access the generated SVG content directly after the component is mounted
  const qrcodeElement = document.querySelector('.qrcode');
  if (qrcodeElement) {
    svgContent.value = qrcodeElement.innerHTML;
  }
});

const setValueInput = (newValue: string) => {
  valueinput.value = newValue;
};

const downloadQrCode = () => {
  generateSvgContent(); // Regenerate the SVG content with the latest input

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