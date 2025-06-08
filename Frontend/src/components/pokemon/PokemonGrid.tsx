import React from 'react';
import PokemonCard from './PokemonCard';
import Loader from '../ui/Loader';
import { usePokemonList } from '../../hooks/usePokemon';
import { getPokemonDetails } from '../../services/api';
import { Pokemon } from '../../types/pokemon';

const PokemonGrid: React.FC = () => {
  const { 
    pokemonList, 
    isLoading: isListLoading, 
    error: listError,
    nextPage,
    prevPage,
    offset,
    limit,
    totalCount
  } = usePokemonList(12);
  
  const [pokemonDetails, setPokemonDetails] = React.useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (pokemonList.length === 0) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const detailsPromises = pokemonList.map(pokemon => {
          const id = pokemon.url.split('/').filter(Boolean).pop();
          return getPokemonDetails(id || '');
        });
        
        const details = await Promise.all(detailsPromises);
        setPokemonDetails(details);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch Pokemon details'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPokemonDetails();
  }, [pokemonList]);

  if (isListLoading && pokemonDetails.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader size="large" />
      </div>
    );
  }

  if (listError || error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg">
        <p className="text-red-600 font-medium">
          Error loading Pokémon data. Please try again later.
        </p>
      </div>
    );
  }

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonDetails.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      
      {isLoading && (
        <div className="flex justify-center mt-8">
          <Loader size="medium" />
        </div>
      )}
      
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={prevPage}
          disabled={offset === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        
        <div className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
        
        <button
          onClick={nextPage}
          disabled={offset + limit >= totalCount}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonGrid;