import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonList from '../components/PokemonList';
import styled from 'styled-components';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => { 
    const fetchData = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
      const pokemonData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokemonRecord = await axios.get(pokemon.url);
          return pokemonRecord.data;
        })
      );
      setPokemons(pokemonData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const results = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemons(results);
  }, [pokemons, searchTerm]);

  return (
    <Component>
    <div className="app">
      <h1>Pokémon Search</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <PokemonList pokemons={filteredPokemons} />
    </div>
    </Component>
  );
};

export default App;

const Component=styled.div`
  margin:0;
  padding:0;
.app {
  text-align: center;
  padding: 20px;
  background-color:grey;
  // height: 100vh;
}
  h1{
  color:#444444;
  text-transform:uppercase;
  font-size: 50px;
  }

input {
  border-radius:10px;
  border:none;
  padding: 10px;
  margin-bottom: 20px;
  width: 200px;
}

.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pokemon-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color:lightgrey;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 10px;
  text-transform:uppercase;
  text-align: center;
  width: 150px;
  color:#444444;
  height: 150px;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  &:hover{
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transform: scale(1.1);
    transition: 0.3s;
    }
}

.pokemon-card img {
  width: 100px;
  height: 100px;
}
`;