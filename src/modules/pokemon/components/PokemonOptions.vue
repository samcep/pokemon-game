<template>
  <section class="mt-5 flex flex-col">
    <button v-for="{ name, id } in options" :key="id" @click="$emit('selectedOption', id)">
      {{ name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';

interface Props {
  options: Pokemon[];
}
defineProps<Props>();

defineEmits<{
  selectedOption: [id: number];
}>();
</script>

<style scoped></style>
