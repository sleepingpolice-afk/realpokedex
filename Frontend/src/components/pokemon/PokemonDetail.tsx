import React from 'react';
import { TypeIcon, StatsIcon } from '../ui/Icons';
import { Pokemon, PokemonSpecies, EvolutionChain } from '../../types/pokemon';
import { Link } from 'react-router-dom';

interface PokemonDetailProps {
  pokemon: Pokemon;
  species: PokemonSpecies | null;
  evolutionChain: EvolutionChain | null;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({
  pokemon,
  species,
  evolutionChain,
}) => {
  // Format the ID to have leading zeros
  const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;
  
  // Get pokemon types
  const types = pokemon.types.map(typeInfo => typeInfo.type.name);
  
  // Get the primary type color
  const getTypeColor = (type: string) => {
    const typeColors: Record<string, string> = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-200',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-700',
      flying: 'bg-indigo-300',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-800',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-600',
      dark: 'bg-gray-800',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
    };
    
    return typeColors[type.toLowerCase()] || 'bg-gray-400';
  };

  // Get background gradient based on type
  const getTypeGradient = (type: string) => {
    const typeGradients: Record<string, string> = {
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
    
    return typeGradients[type.toLowerCase()] || 'from-gray-300 to-gray-400';
  };

  // Get English description
  const getDescription = () => {
    if (!species) return 'No description available.';
    
    const englishEntries = species.flavor_text_entries.filter(
      entry => entry.language.name === 'en'
    );
    
    if (englishEntries.length === 0) return 'No description available.';
    
    // Get the most recent entry
    return englishEntries[0].flavor_text.replace(/\f/g, ' ');
  };

  // Format stat name
  const formatStatName = (statName: string) => {
    switch (statName) {
      case 'hp':
        return 'HP';
      case 'attack':
        return 'Attack';
      case 'defense':
        return 'Defense';
      case 'special-attack':
        return 'Sp. Atk';
      case 'special-defense':
        return 'Sp. Def';
      case 'speed':
        return 'Speed';
      default:
        return statName.charAt(0).toUpperCase() + statName.slice(1);
    }
  };

  // Get the max value for the stat bar (for visual purposes)
  const maxStatValue = 255;
  
  // Get stat color based on value
  const getStatColor = (value: number) => {
    if (value < 50) return 'bg-red-500';
    if (value < 90) return 'bg-orange-500';
    if (value < 120) return 'bg-yellow-500';
    if (value < 150) return 'bg-green-500';
    return 'bg-blue-500';
  };

  // Process evolution chain data
  const getEvolutionData = () => {
    if (!evolutionChain) return [];
    
    const evolutions: { name: string; id: number }[] = [];
    
    // Add base form
    const baseSpecies = evolutionChain.chain.species;
    const baseId = Number(baseSpecies.url.split('/').filter(Boolean).pop());
    evolutions.push({ name: baseSpecies.name, id: baseId });
    
    // Add first evolution if it exists
    if (evolutionChain.chain.evolves_to.length > 0) {
      const firstEvo = evolutionChain.chain.evolves_to[0].species;
      const firstEvoId = Number(firstEvo.url.split('/').filter(Boolean).pop());
      evolutions.push({ name: firstEvo.name, id: firstEvoId });
      
      // Add second evolution if it exists
      if (evolutionChain.chain.evolves_to[0].evolves_to.length > 0) {
        const secondEvo = evolutionChain.chain.evolves_to[0].evolves_to[0].species;
        const secondEvoId = Number(secondEvo.url.split('/').filter(Boolean).pop());
        evolutions.push({ name: secondEvo.name, id: secondEvoId });
      }
    }
    
    return evolutions;
  };
  
  const evolutions = getEvolutionData();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className={`bg-gradient-to-r ${getTypeGradient(types[0])} p-8 text-white relative`}>
        <div className="absolute top-4 right-4 text-white opacity-70 text-xl font-bold">
          {formattedId}
        </div>
        
        <h1 className="text-4xl font-bold capitalize mb-2">
          {pokemon.name.replace(/-/g, ' ')}
        </h1>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {types.map(type => (
            <TypeIcon key={type} type={type} className="text-sm px-4 py-1" />
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <img
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-64 h-64 object-contain drop-shadow-lg transform transition-transform duration-300 hover:scale-110"
          />
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Description</h2>
          <p className="text-gray-600 leading-relaxed">{getDescription()}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Stats</h2>
            <div className="space-y-3">
              {pokemon.stats.map(stat => (
                <div key={stat.stat.name} className="flex items-center">
                  <div className="w-24 mr-2 flex items-center">
                    <StatsIcon stat={stat.stat.name} />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {formatStatName(stat.stat.name)}
                    </span>
                  </div>
                  <div className="flex-1 h-5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStatColor(stat.base_stat)} rounded-full transition-all duration-500`}
                      style={{ width: `${(stat.base_stat / maxStatValue) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-10 text-right text-sm font-medium text-gray-700">
                    {stat.base_stat}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Height</p>
                <p className="font-medium">{pokemon.height / 10} m</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Weight</p>
                <p className="font-medium">{pokemon.weight / 10} kg</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Base Experience</p>
                <p className="font-medium">{pokemon.base_experience}</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">Abilities</h2>
            <div className="grid grid-cols-2 gap-2">
              {pokemon.abilities.map(ability => (
                <div 
                  key={ability.ability.name}
                  className={`p-2 rounded-md ${ability.is_hidden ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}
                >
                  <p className="capitalize font-medium">
                    {ability.ability.name.replace(/-/g, ' ')}
                    {ability.is_hidden && <span className="text-xs ml-1">(Hidden)</span>}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {evolutions.length > 1 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Evolution Chain</h2>
            <div className="flex items-center justify-center flex-wrap space-x-2">
              {evolutions.map((evo, index) => (
                <React.Fragment key={evo.id}>
                  <Link 
                    to={`/pokemon/${evo.id}`}
                    className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${evo.id === pokemon.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                  >
                    <div className={`w-16 h-16 ${getTypeColor(types[0])} rounded-full flex items-center justify-center`}>
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.id}.png`}
                        alt={evo.name}
                        className="w-12 h-12"
                      />
                    </div>
                    <span className="mt-1 capitalize text-sm font-medium">{evo.name.replace(/-/g, ' ')}</span>
                  </Link>
                  
                  {index < evolutions.length - 1 && (
                    <div className="text-gray-400 font-bold">→</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Moves</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {pokemon.moves.slice(0, 12).map(moveInfo => (
              <div 
                key={moveInfo.move.name}
                className="p-2 bg-gray-100 rounded-md text-gray-700 text-sm capitalize"
              >
                {moveInfo.move.name.replace(/-/g, ' ')}
              </div>
            ))}
            {pokemon.moves.length > 12 && (
              <div className="p-2 bg-gray-100 rounded-md text-gray-700 text-sm font-medium">
                +{pokemon.moves.length - 12} more
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;