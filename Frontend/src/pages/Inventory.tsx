import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Navbar from '../components/layout/Navbar';
import { BackendPokemon } from '../types/pokemon';
import apiClient from '../services/api'; 
import { useAuth } from '../hooks/useAuth';
import PokemonDetailModal from '../components/pokemon/PokemonDetailModal'; // Import modal
import PokemonForm from '../components/pokemon/PokemonForm'; // Import form
import { PlusCircle, ArrowLeft } from 'lucide-react'; // Icon for Add button and Back button

const Inventory: React.FC = () => {
  const [pokemonCollection, setPokemonCollection] = useState<BackendPokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth(); 

  const [selectedPokemon, setSelectedPokemon] = useState<BackendPokemon | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'modify'>('add');

  const fetchPokemon = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get<BackendPokemon[]>('/pokemon'); 
      setPokemonCollection(response.data);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch Pokemon collection:", err);
      let errorMessage = "Failed to load Pokemon collection.";
      if (err.response && err.response.data && err.response.data.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      setPokemonCollection([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [user]);

  const handleCardClick = (pokemon: BackendPokemon) => {
    setSelectedPokemon(pokemon);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedPokemon(null);
  };

  const handleOpenFormModal = (mode: 'add' | 'modify', pokemon?: BackendPokemon) => {
    setFormMode(mode);
    setSelectedPokemon(pokemon || null); // Pre-fill if modifying
    setIsFormModalOpen(true);
    setIsDetailModalOpen(false); // Close detail modal if it was open
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setSelectedPokemon(null);
  };

  const handleFormSuccess = (updatedPokemon: BackendPokemon) => {
    if (formMode === 'add') {
      setPokemonCollection(prev => [...prev, updatedPokemon]);
    } else {
      setPokemonCollection(prev => 
        prev.map(p => (p.name === updatedPokemon.name ? updatedPokemon : p))
      );
    }
    fetchPokemon(); // Re-fetch to ensure data consistency, or update locally
    handleCloseFormModal();
  };

  const handleDeletePokemon = async (pokemonName: string) => {
    if (!window.confirm(`Are you sure you want to delete ${pokemonName}? This action cannot be undone.`)) {
        return;
    }
    try {
      setIsLoading(true); // Optional: show loading state during delete
      await apiClient.delete(`/pokemon/${pokemonName}`);
      setPokemonCollection(prev => prev.filter(p => p.name !== pokemonName));
      handleCloseDetailModal(); // Close modal after deletion
      setError(null);
    } catch (err: any) {
      console.error("Failed to delete Pokemon:", err);
      const apiError = err.response?.data?.error || err.message || "Could not delete Pokemon.";
      setError(apiError); // Display error to user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 mt-12"> {/* Added mt-12 for spacing below Navbar */}
            <Link 
                to="/dashboard" 
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
            >
                <ArrowLeft size={16} className="mr-1.5" />
                Back to Dashboard
            </Link>
        </div>

        <div className="mb-8 mt-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pokemon Collection</h1>
            <p className="mt-2 text-gray-600">
                  Manage your captured Pokémon.
            </p>
          </div>
          <button 
            onClick={() => handleOpenFormModal('add')}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-150 shadow-sm"
          >
            <PlusCircle size={20} className="mr-2" />
            Add Pokemon
          </button>
        </div>

        {isLoading && !isFormModalOpen && !isDetailModalOpen && <p className="text-center py-4">Loading Pokemon...</p>}
        {error && <p className="text-red-500 text-center py-4 bg-red-100 p-3 rounded-md">Error: {error}</p>}
        
        {!isLoading && !error && pokemonCollection.length === 0 && !isFormModalOpen && (
          <p className="text-center py-4">No Pokemon in your collection yet. Click "Add Pokemon" to start!</p>
        )}

        {!isLoading && !error && pokemonCollection.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pokemonCollection.map((pokemon) => (
              <div 
                key={pokemon._id.$oid} 
                className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between cursor-pointer hover:shadow-xl transition-shadow duration-150"
                onClick={() => handleCardClick(pokemon)} // Open detail modal on click
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-800 capitalize">{pokemon.name}</h2>
                  <p className="text-gray-600 text-sm">Type: {pokemon.type.join(', ')}</p>
                  <p className="text-xs text-gray-500 mt-1 truncate">Abilities: {pokemon.abilities.join(', ')}</p>
                  {pokemon.moves && pokemon.moves.length > 0 && (
                    <p 
                      className="text-xs text-gray-500 mt-1 truncate" 
                      title={`Moves: ${pokemon.moves.join(', ')}`}
                    >
                      Moves: {pokemon.moves.slice(0, 2).join(', ')}{pokemon.moves.length > 2 ? '...' : ''}
                    </p>
                  )}
                  <div className="mt-2">
                    <h4 className="font-semibold text-xs">Base Stats:</h4>
                    <ul className="list-disc list-inside text-xs text-gray-600">
                      <li>HP: {pokemon.stats.hp}</li>
                      <li>Attack: {pokemon.stats.attack}</li>
                      <li>Defense: {pokemon.stats.defense}</li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Detail Modal */}
      <PokemonDetailModal 
        pokemon={selectedPokemon}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        onModify={(poke: BackendPokemon) => handleOpenFormModal('modify', poke)} // Added type for poke
        onDelete={handleDeletePokemon}
      />

      {/* Add/Modify Form Modal */}
      {isFormModalOpen && (
        <PokemonForm 
          pokemon={selectedPokemon} 
          onSuccess={handleFormSuccess} 
          onCancel={handleCloseFormModal} 
          mode={formMode} 
        />
      )}
    </div>
  );
};

export default Inventory;
