import { useEffect, useState } from "react"; // Removed React import
import { Link } from 'react-router-dom'; // Import Link
import Navbar from "../components/layout/Navbar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import apiClient from "../services/api"; // Import apiClient
import { BackendPokemon } from "../types/pokemon"; // Import BackendPokemon type
import Loader from "../components/ui/Loader"; // Changed to default import
import { ArrowLeft } from 'lucide-react'; // Import ArrowLeft icon

export default function Statistic() {
    const [pokemonData, setPokemonData] = useState<BackendPokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get<BackendPokemon[]>("/pokemon");
                setPokemonData(response.data);
                setError(null);
            } catch (err) {
                setError("Failed to fetch Pokémon data. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonData();
    }, []);

    const countByType = pokemonData.reduce((acc, curr) => {
        // Assuming the first type in the array is the primary type for statistics
        const primaryType = curr.type[0]; 
        if (primaryType) {
            acc[primaryType] = (acc[primaryType] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
                    <Loader />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                    <h1 className="text-2xl font-bold text-red-600">{error}</h1>
                </div>
            </div>
        );
    }

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
            <div className="mb-8 mt-6">
            <h1 className="text-3xl font-bold text-gray-900">Pokemon Collection Statistics</h1>
            <p className="mt-2 text-gray-600">
                Explore statistics about your Pokémon collection.
            </p>
            </div>

            {/* Grafik Distribusi Tipe */} 
            <div className="flex flex-col items-center justify-center mt-8">
                <h2 className="text-2xl font-bold mb-4">Pokemon Type Distribution</h2>
                {pokemonData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={Object.entries(countByType).map(([type, count]) => ({ type, count }))}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="type" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#23F01F" activeBar={{fill: "#23D320"}} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p>No Pokémon data available to display statistics.</p>
                )}
            </div>

            {/* table that show name, type */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Pokemon Details Table</h2>
                {pokemonData.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b text-left">Name</th>
                                    <th className="py-2 px-4 border-b text-left">Type(s)</th>
                                    {/* Add other relevant headers if needed, e.g., HP, Attack, Defense */}
                                    <th className="py-2 px-4 border-b text-left">HP</th>
                                    <th className="py-2 px-4 border-b text-left">Attack</th>
                                    <th className="py-2 px-4 border-b text-left">Defense</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pokemonData.map((pokemon) => (
                                    <tr key={pokemon._id.$oid} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b">{pokemon.name}</td>
                                        <td className="py-2 px-4 border-b">{pokemon.type.join(", ")}</td>
                                        <td className="py-2 px-4 border-b">{pokemon.stats.hp}</td>
                                        <td className="py-2 px-4 border-b">{pokemon.stats.attack}</td>
                                        <td className="py-2 px-4 border-b">{pokemon.stats.defense}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No Pokémon data available to display in the table.</p>
                )}
            </div>
        </main>
    </div>
    );
};