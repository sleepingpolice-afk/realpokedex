import { useState } from 'react';
import { BackendPokemon } from '../../types/pokemon';
import apiClient from '../../services/api';

interface PokemonFormProps {
  pokemon?: BackendPokemon | null;
  onSuccess: (pokemon: BackendPokemon) => void;
  onCancel: () => void;
  mode: 'add' | 'modify';
}

const PokemonForm = ({ pokemon, onSuccess, onCancel, mode }: PokemonFormProps) => {
  const [name, setName] = useState(pokemon?.name || '');
  const [types, setTypes] = useState(pokemon?.type?.join(', ') || '');
  const [abilities, setAbilities] = useState(pokemon?.abilities?.join(', ') || '');
  const [moves, setMoves] = useState(pokemon?.moves?.join(', ') || ''); // Added moves state
  const [hp, setHp] = useState(pokemon?.stats?.hp?.toString() || '0');
  const [attack, setAttack] = useState(pokemon?.stats?.attack?.toString() || '0');
  const [defense, setDefense] = useState(pokemon?.stats?.defense?.toString() || '0');
  const [specialAttack, setSpecialAttack] = useState(pokemon?.stats?.specialAttack?.toString() || '0');
  const [specialDefense, setSpecialDefense] = useState(pokemon?.stats?.specialDefense?.toString() || '0');
  const [speed, setSpeed] = useState(pokemon?.stats?.speed?.toString() || '0');
  const [evolvesFrom, setEvolvesFrom] = useState(pokemon?.evolution?.evolvesFrom || '');
  const [evolvesTo, setEvolvesTo] = useState(pokemon?.evolution?.evolvesTo || '');
  const [description, setDescription] = useState(pokemon?.description || '');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const pokemonDataPayload = {
      name,
      type: types.split(',').map((t: string) => t.trim()).filter(t => t),
      abilities: abilities.split(',').map((a: string) => a.trim()).filter(a => a),
      moves: moves.split(',').map((m: string) => m.trim()).filter(m => m), // Added moves to payload
      stats: {
        hp: parseInt(hp, 10),
        attack: parseInt(attack, 10),
        defense: parseInt(defense, 10),
        specialAttack: parseInt(specialAttack, 10),
        specialDefense: parseInt(specialDefense, 10),
        speed: parseInt(speed, 10),
      },
      evolution: {
        evolvesFrom: evolvesFrom || null,
        evolvesTo: evolvesTo || null,
      },
      description,
    };

    try {
      let response;
      if (mode === 'add') {
        response = await apiClient.post<BackendPokemon>('/pokemon', pokemonDataPayload);
      } else if (mode === 'modify' && pokemon) {
        response = await apiClient.put<BackendPokemon>(`/pokemon/${pokemon.name}`, pokemonDataPayload);
      } else {
        throw new Error('Invalid mode or missing Pokemon data for modification.');
      }
      onSuccess(response.data);
    } catch (err: any) {
      console.error(`Failed to ${mode} Pokemon:`, err);
      const apiError = err.response?.data?.error || err.message || `Could not ${mode} Pokemon.`;
      setError(apiError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col">
        <h2 className="text-xl font-bold mb-6 text-gray-800 flex-shrink-0">
          {mode === 'add' ? 'Add New Pokemon' : `Modify ${pokemon?.name}`}
        </h2>
        {error && <p className="text-red-500 text-sm mb-4 bg-red-100 p-2 rounded flex-shrink-0">Error: {error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto flex-grow pr-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>

          <div>
            <label htmlFor="types" className="block text-sm font-medium text-gray-700">Types (comma-separated)</label>
            <input type="text" id="types" value={types} onChange={e => setTypes(e.target.value)} required
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>

          <div>
            <label htmlFor="abilities" className="block text-sm font-medium text-gray-700">Abilities (comma-separated)</label>
            <input type="text" id="abilities" value={abilities} onChange={e => setAbilities(e.target.value)} required
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>

          <div>
            <label htmlFor="moves" className="block text-sm font-medium text-gray-700">Moves (comma-separated)</label>
            <input type="text" id="moves" value={moves} onChange={e => setMoves(e.target.value)} required
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>

          <fieldset className="border p-4 rounded-md">
            <legend className="text-sm font-medium text-gray-700 px-1">Stats</legend>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="hp" className="block text-xs font-medium text-gray-700">HP</label>
                <input type="number" id="hp" value={hp} onChange={e => setHp(e.target.value)} required min="0"
                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
              </div>
              <div>
                <label htmlFor="attack" className="block text-xs font-medium text-gray-700">Attack</label>
                <input type="number" id="attack" value={attack} onChange={e => setAttack(e.target.value)} required min="0"
                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
              </div>
              <div>
                <label htmlFor="defense" className="block text-xs font-medium text-gray-700">Defense</label>
                <input type="number" id="defense" value={defense} onChange={e => setDefense(e.target.value)} required min="0"
                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
              </div>
              <div>
                <label htmlFor="specialAttack" className="block text-xs font-medium text-gray-700">Special Attack</label>
                <input type="number" id="specialAttack" value={specialAttack} onChange={e => setSpecialAttack(e.target.value)} required min="0"
                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
              </div>
              <div>
                <label htmlFor="specialDefense" className="block text-xs font-medium text-gray-700">Special Defense</label>
                <input type="number" id="specialDefense" value={specialDefense} onChange={e => setSpecialDefense(e.target.value)} required min="0"
                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
              </div>
              <div>
                <label htmlFor="speed" className="block text-xs font-medium text-gray-700">Speed</label>
                <input type="number" id="speed" value={speed} onChange={e => setSpeed(e.target.value)} required min="0"
                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
              </div>
            </div>
          </fieldset>

          <fieldset className="border p-4 rounded-md">
            <legend className="text-sm font-medium text-gray-700 px-1">Evolution</legend>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="evolvesFrom" className="block text-xs font-medium text-gray-700">Evolves From</label>
                <input type="text" id="evolvesFrom" value={evolvesFrom} onChange={e => setEvolvesFrom(e.target.value)}
                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
              </div>
              <div>
                <label htmlFor="evolvesTo" className="block text-xs font-medium text-gray-700">Evolves To</label>
                <input type="text" id="evolvesTo" value={evolvesTo} onChange={e => setEvolvesTo(e.target.value)}
                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
              </div>
            </div>
          </fieldset>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 flex-shrink-0">
            <button type="button" onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150">
              Cancel
            </button>
            <button type="submit" disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150">
              {isLoading ? 'Saving...' : (mode === 'add' ? 'Add Pokemon' : 'Save Changes')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PokemonForm;
