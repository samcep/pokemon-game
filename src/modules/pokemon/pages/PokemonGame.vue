<template>
  <section v-if="isLoading || randomPokemon.id == null">
    <h1 class="flex flex-col justify-center items-center">Loading...</h1>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1>Who is this pokemon?</h1>

    <PokemonPicture :pokemon-Id="randomPokemon.id" :show-real-pokemon="true" />
    <PokemonOptions @selected-option="selectedOption" :options="options" />
  </section>
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';

const {
  gameStatus,
  randomPokemon,
  isLoading,
  pokemonOptions: options,
  checkAnswer,
} = usePokemonGame();

const selectedOption = (value: number) => {
  console.log(value);
};
</script>
