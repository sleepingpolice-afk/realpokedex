import React from 'react';
import { Link } from 'react-router-dom';
import { TypeIcon } from '../ui/Icons';
import { Pokemon } from '../../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  // Format the ID to have leading zeros (e.g., #001, #025)
  const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;
  
  // Get pokemon types
  const types = pokemon.types.map(typeInfo => typeInfo.type.name);
  
  // Get a gradient based on the primary type
  const getTypeGradient = (type: string) => {
    const typeColors: Record<string, string> = {
      normal: 'from-gray-300 to-gray-400',
      fire: 'from-red-400 to-orange-500',
      water: 'from-blue-400 to-blue-500',
      electric: 'from-yellow-300 to-yellow-400',
      grass: 'from-green-400 to-green-500',
      ice: 'from-blue-200 to-blue-300',
      fighting: 'from-red-600 to-red-700',
      poison: 'from-purple-400 to-purple-500',
      ground: 'from-yellow-600 to-yellow-700',
      flying: 'from-indigo-300 to-blue-400',
      psychic: 'from-pink-400 to-pink-500',
      bug: 'from-green-400 to-lime-500',
      rock: 'from-yellow-700 to-yellow-800',
      ghost: 'from-purple-600 to-purple-700',
      dragon: 'from-indigo-500 to-indigo-600',
      dark: 'from-gray-700 to-gray-800',
      steel: 'from-gray-400 to-gray-500',
      fairy: 'from-pink-300 to-pink-400',
    };
    
    return typeColors[type.toLowerCase()] || 'from-gray-300 to-gray-400';
  };

  // Get the primary type gradient
  const cardGradient = getTypeGradient(types[0]);

  return (
    <Link 
      to={`/pokemon/${pokemon.id}`}
      className="block transform transition duration-300 hover:-translate-y-2 hover:shadow-lg"
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
        <div className={`bg-gradient-to-r ${cardGradient} p-4 relative`}>
          <span className="text-white text-xs font-semibold opacity-70 absolute top-2 right-2">
            {formattedId}
          </span>
          <div className="flex justify-center py-2">
            <img 
              src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
              alt={pokemon.name}
              className="h-32 w-32 object-contain transform transition-transform duration-300 hover:scale-110"
            />
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-gray-800 font-bold text-xl capitalize mb-2">
            {pokemon.name.replace(/-/g, ' ')}
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {types.map((type) => (
              <TypeIcon key={type} type={type} />
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Height</p>
                <p className="font-medium">{pokemon.height / 10} m</p>
              </div>
              <div>
                <p className="text-gray-500">Weight</p>
                <p className="font-medium">{pokemon.weight / 10} kg</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;