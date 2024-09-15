import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';
import PokemonOptions from '../components/PokemonOptions.vue';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]);
  const randomPokemon = computed<Pokemon>(() => pokemonOptions.value[0]);
  const isLoading = computed<boolean>(() => pokemons.value.length == 0);

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');
    const pokemonsArray = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts[urlParts.length - 2] ?? 0;
      return {
        name: pokemon.name,
        id: Number(id),
      };
    });

    return pokemonsArray.sort(() => Math.random() - 0.5);
  };

  const getNextOptions = (howMany: number = 10) => {
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  };

  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value.id == id;
    if (hasWon) {
      gameStatus.value = GameStatus.Won;
    } else {
      gameStatus.value = GameStatus.Lost;
    }
  };

  onMounted(async () => {
    pokemons.value = await getPokemons();
    getNextOptions();
  });
  return {
    gameStatus,
    isLoading,
    randomPokemon,
    pokemonOptions,
    //Methods
    getNextOptions,
    checkAnswer,
  };
};
