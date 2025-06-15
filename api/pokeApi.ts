export interface Pokemon {
    name: string;
    url: string;
    id?: number;
    image?: string;
    sprites?: any;
    abilities?: any;
    stats?: any;
    types?: any;
    height?: any;
    weight?: any;
}


export const getPokemon = async(limit = 150): Promise<Pokemon[]> => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await res.json();

    return data.results.map((item: Pokemon, index: number) => ({
        ...item,
        id: index+1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
    }));
}

export const getPokemonDetails = async(id: string): Promise<Pokemon[]> => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    return data;
}