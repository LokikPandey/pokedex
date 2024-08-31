import React from 'react';
import PokemonCards from './PokemonCards';

const PokemonList = ({ pokemons }) => {
  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon, index) => (
        <PokemonCards key={index} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
