import { useState, useEffect, useCallback } from 'react';
import { 
  getPokemonList, 
  getPokemonDetails, 
  getPokemonSpecies, 
  getEvolutionChain 
} from '../services/api';
import { Pokemon, PokemonSpecies, EvolutionChain, PokemonListResponse } from '../types/pokemon';

interface UsePokemonListResult {
  pokemonList: { name: string; url: string }[];
  isLoading: boolean;
  error: Error | null;
  totalCount: number;
  nextPage: () => void;
  prevPage: () => void;
  offset: number;
  limit: number;
}

export const usePokemonList = (initialLimit = 20): UsePokemonListResult => {
  const [pokemonList, setPokemonList] = useState<{ name: string; url: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [limit] = useState<number>(initialLimit);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchPokemonList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data: PokemonListResponse = await getPokemonList(limit, offset);
      setPokemonList(data.results);
      setTotalCount(data.count);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch Pokemon list'));
    } finally {
      setIsLoading(false);
    }
  }, [limit, offset]);

  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  const nextPage = useCallback(() => {
    setOffset(prevOffset => prevOffset + limit);
  }, [limit]);

  const prevPage = useCallback(() => {
    setOffset(prevOffset => Math.max(0, prevOffset - limit));
  }, [limit]);

  return {
    pokemonList,
    isLoading,
    error,
    totalCount,
    nextPage,
    prevPage,
    offset,
    limit,
  };
};

interface UsePokemonDetailsResult {
  pokemon: Pokemon | null;
  species: PokemonSpecies | null;
  evolutionChain: EvolutionChain | null;
  isLoading: boolean;
  error: Error | null;
}

export const usePokemonDetails = (idOrName: string | number): UsePokemonDetailsResult => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch basic Pokemon data
        const pokemonData: Pokemon = await getPokemonDetails(idOrName);
        setPokemon(pokemonData);
        
        // Fetch species data (includes descriptions and evolution chain URL)
        const speciesData: PokemonSpecies = await getPokemonSpecies(idOrName);
        setSpecies(speciesData);
        
        // Fetch evolution chain data
        if (speciesData.evolution_chain?.url) {
          const evolutionData: EvolutionChain = await getEvolutionChain(speciesData.evolution_chain.url);
          setEvolutionChain(evolutionData);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch Pokemon details'));
      } finally {
        setIsLoading(false);
      }
    };

    if (idOrName) {
      fetchDetails();
    }
  }, [idOrName]);

  return {
    pokemon,
    species,
    evolutionChain,
    isLoading,
    error,
  };
};