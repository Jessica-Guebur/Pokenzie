// ENDPOINT CAPTURAR INFO DE POKEMON POR ID 
// https://pokeapi.co/api/v2/pokemon/1

const fetchPokemon = async (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    // const data = await fetch(url);
    // const dataJson = await data.json()
    const data = await fetch(url).then((response) => response.json());

    return data;
};

const processPokemonData = (pokemonData) => {
    const id = pokemonData.id;
    const name = pokemonData.name;
    const img = pokemonData.sprites.other.dream_world.front_default;

    //STATS
    const hpObj = pokemonData.stats.find(element => element.stat.name === 'hp');
    const hp = hpObj.base_stat;

    const attackObj = pokemonData.stats.find(element => element.stat.name === 'attack');
    const attack = attackObj.base_stat;

    const defenseObj = pokemonData.stats.find(element => element.stat.name === 'defense');
    const defense = defenseObj.base_stat;

    const speedObj = pokemonData.stats.find(element => element.stat.name === 'speed');
    const speed = speedObj.base_stat;

    const types = pokemonData.types.map(element => element.type.name);

    const pokemonObj = {
        id: id,
        name: name,
        img: img,
        types: types,
        hp: hp,
        attack: attack,
        defense: defense,
        speed: speed,
    };

    return pokemonObj;
}

export const mountPokemonArray = async (amount = 5) => {

    const pokemonArray = [];

    for(let i = 0; i < amount; i++){
    const pokemonData = await fetchPokemon(i +1);
    const pokemonObj = processPokemonData(pokemonData);
    pokemonArray.push(pokemonObj);
    
    }

    return pokemonArray;
    
};
