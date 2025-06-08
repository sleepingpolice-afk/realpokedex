import { Zap } from 'lucide-react';

export const PokemonIcon = ({ className }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-red-500 rounded-t-full"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white rounded-b-full"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/3 h-1/3 bg-white rounded-full border-2 border-gray-800"></div>
      </div>
    </div>
  );
};

export const TypeIcon = ({ type, className }: { type: string; className?: string }) => {
  const getTypeColor = (type: string) => {
    const types: Record<string, string> = {
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
    
    return types[type.toLowerCase()] || 'bg-gray-400';
  };

  return (
    <div className={`${getTypeColor(type)} ${className} rounded-full px-3 py-1 text-white text-xs font-medium`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </div>
  );
};

export const StatsIcon = ({ stat }: { stat: string }) => {
  switch (stat.toLowerCase()) {
    case 'hp':
      return <div className="w-5 h-5 bg-red-500 rounded-full"></div>;
    case 'attack':
      return <Zap className="w-5 h-5 text-orange-500" />;
    case 'defense':
      return <div className="w-5 h-5 bg-blue-500 rounded-full"></div>;
    case 'special-attack':
      return <Zap className="w-5 h-5 text-purple-500" />;
    case 'special-defense':
      return <div className="w-5 h-5 bg-green-500 rounded-full"></div>;
    case 'speed':
      return <div className="w-5 h-5 bg-yellow-500 rounded-full"></div>;
    default:
      return <div className="w-5 h-5 bg-gray-500 rounded-full"></div>;
  }
};