<template>
  <section>
    <img :src="pokemonImageUrl" class="brightness-0 h-[200px]" alt="" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  pokemonId: number;
  showRealPokemon: boolean;
}

const props = defineProps<Props>();

const pokemonImageUrl = computed<string>(
  () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`,
);
</script>

<style scoped>
img {
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
</style>
