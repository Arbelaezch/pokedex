"use client";
import { useState } from 'react';
import Image from 'next/image'
import useSWR from 'swr'


// Fetcher function
const fetcher = (url: string) => fetch(url).then(res => res.json())

function capitalizeFirstLetter(name:string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}


export default function Pokedex() {
    const [pokemonName, setPokemonName] = useState('');
    const [query, setQuery] = useState('');
    
    const { data, error } = useSWR(query ? `https://pokeapi.co/api/v2/pokemon/${query}` : null, fetcher);
    
    const handleInputChange = (event) => {
        setPokemonName(event.target.value.toLowerCase()); // Pokemon API expects lowercase names
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setQuery(pokemonName);
    };


    return (
        <main>
            <div className="grid h-screen place-items-center">
                {error && <div>Error fetching Pokémon</div>}
                {data && (
                    <div>
                    <h1>{capitalizeFirstLetter(data.name)}</h1>
                    <img src={data.sprites.front_default} alt={data.name} />
                    <p>Height: {data.height}</p>
                    <p>Weight: {data.weight}</p>
                    <p>Base Experience: {data.base_experience}</p>
                    <p>Description: {data.descriptions}</p>
                    <p>Type: {data.type}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="my-3">
                    <input className="border py-1 border-black"
                    type="text"
                    placeholder="Enter Pokémon name"
                    value={pokemonName}
                    onChange={handleInputChange}
                    />
                    <button type="submit" className="border border-black bg-red-300 px-4 py-1">Search</button>
                </form>
            </div>
        </main>
    )
}
