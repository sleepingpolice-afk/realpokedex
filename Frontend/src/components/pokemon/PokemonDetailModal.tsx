import React from 'react'; // Keep React import for FC type
import { BackendPokemon } from '../../types/pokemon';
import { X } from 'lucide-react'; // Using lucide-react for icons

interface PokemonDetailModalProps {
  pokemon: BackendPokemon | null;
  isOpen: boolean;
  onClose: () => void;
  onModify: (pokemon: BackendPokemon) => void;
  onDelete: (pokemonName: string) => void;
}

const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({
  pokemon,
  isOpen,
  onClose,
  onModify,
  onDelete,
}) => {
  if (!isOpen || !pokemon) {
    return null;
  }

  const handleModifyClick = () => {
    onModify(pokemon);
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete ${pokemon.name}?`)) {
      onDelete(pokemon.name);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative max-h-[85vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-10"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 capitalize text-gray-800 flex-shrink-0">{pokemon.name}</h2>
        
        <div className="space-y-2 text-sm text-gray-700 mb-6 overflow-y-auto flex-grow">
          <p><strong>Type(s):</strong> {pokemon.type.join(', ')}</p>
          <p><strong>Abilities:</strong> {pokemon.abilities.join(', ')}</p>
          <div>
            <strong>Moves:</strong>
            {pokemon.moves && pokemon.moves.length > 0 ? (
              <ul className="list-disc list-inside ml-4">
                {pokemon.moves.map((move, index) => (
                  <li key={index}>{move}</li>
                ))}
              </ul>
            ) : (
              <p className="ml-4">No moves listed.</p>
            )}
          </div>
          <div>
            <strong>Stats:</strong>
            <ul className="list-disc list-inside ml-4">
              <li>HP: {pokemon.stats.hp}</li>
              <li>Attack: {pokemon.stats.attack}</li>
              <li>Defense: {pokemon.stats.defense}</li>
              <li>Special Attack: {pokemon.stats.specialAttack}</li>
              <li>Special Defense: {pokemon.stats.specialDefense}</li>
              <li>Speed: {pokemon.stats.speed}</li>
            </ul>
          </div>
          {pokemon.evolution && (pokemon.evolution.evolvesFrom || pokemon.evolution.evolvesTo) && (
            <div>
              <strong>Evolution:</strong>
              {pokemon.evolution.evolvesFrom && <p className="ml-4">Evolves from: {pokemon.evolution.evolvesFrom}</p>}
              {pokemon.evolution.evolvesTo && <p className="ml-4">Evolves to: {pokemon.evolution.evolvesTo}</p>}
            </div>
          )}
          <p><strong>Description:</strong> {pokemon.description}</p>
        </div>

        <div className="flex justify-end space-x-3 flex-shrink-0 pt-4 border-t border-gray-200">
          <button
            onClick={handleModifyClick}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-150"
          >
            Modify
          </button>
          <button
            onClick={handleDeleteClick}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-150"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailModal;
