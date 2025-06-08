import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Your Flask backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token if available
apiClient.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        // IMPORTANT: Adjust this if your login response/user object stores the token differently
        // For example, if your backend sends a token directly upon login,
        // and you store it as `user.token`
        if (user && user.token) { 
          config.headers.Authorization = `Bearer ${user.token}`;
        }
        // If your backend doesn't use Bearer tokens but expects user_id or email in headers
        // for authenticated requests to /pokemon, you might need to adjust this.
        // For now, assuming JWT Bearer token.
      } catch (e) {
        console.error("Could not parse user from localStorage or attach token", e);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;

// Functions for PokeAPI (can be kept or removed based on your needs)
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

const fetchPokeApiData = async (endpoint: string) => {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('PokeAPI Error:', error);
    throw error;
  }
};

export const getPokemonList = async (limit = 20, offset = 0) => {
  return fetchPokeApiData(`/pokemon?limit=${limit}&offset=${offset}`);
};

export const getPokemonDetails = async (idOrName: string | number) => {
  return fetchPokeApiData(`/pokemon/${idOrName}`);
};

export const getPokemonSpecies = async (idOrName: string | number) => {
  return fetchPokeApiData(`/pokemon-species/${idOrName}`);
};

export const getEvolutionChain = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('PokeAPI Error:', error);
    throw error;
  }
};

export const searchPokemon = async (query: string) => {
  return fetchPokeApiData(`/pokemon/${query.toLowerCase()}`);
};