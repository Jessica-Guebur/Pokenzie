import { handleDarkMode } from "./theme.js";
import {mountPokemonArray } from "./api.js";

function createPokemonCard({name, img, types, hp, attack, defense, speed}){
    const liCard = document.createElement("li");
    liCard.classList.add("card");

    liCard.innerHTML = `
    <i class="card_fav fa-regular fa-star"></i>
    <p class="card__hp">
        <span>HP</span>
        ${hp}
    </p>
    <img class="card__img" src=${img} alt= "Imagem do Pokemon ${name}">
    <h2 class="card__name">${name}</h2>
    <small class="card__type">${types.join(" - ")}</small>
    <ul class="card__stats">
        <li class="card__stat">
            <h3 class="stat__value">${attack}</h3>
            <p class="stat__type">ATQ</p>
        </li>
        <li class="card__stat">
            <h3 class="stat__value">${defense}</h3>
            <p class="stat__type">DEF</p>
        </li>
        <li class="card__stat">
            <h3 class="stat__value">${speed}</h3>
            <p class="stat__type">VEL</p>
        </li>                    
</ul>
    `;

    const favIcon = liCard.querySelector(".card_fav");
    
    handleFavoriteEvent(favIcon);

    return liCard;
}

function renderPokemonCards(pokemonArray){
    const ulPokemonList = document.querySelector(`.cards`);
    ulPokemonList.innerHTML = "";

    pokemonArray.forEach((pokemonInfo) => {
        const pokemonCard = createPokemonCard(pokemonInfo);
        ulPokemonList.append(pokemonCard);
    })

}

function handleFavoriteEvent(btnFav){
    // const btnFav = document.querySelector(".card_fav");


    btnFav.addEventListener('click', (event) => {
        console.log("evento acionado")

        btnFav.classList.toggle("fa-solid");
        btnFav.classList.toggle("fa-regular");
    });
}

function handleStatFilter (pokemonArray){
    const filterForm = document.querySelector(".filter_form");
    const attackFilterInput = document.querySelector("#attack_range-filter");
    const defenseFilterInput = document.querySelector("#defense_range-filter");
    const speedFilterInput = document.querySelector("#speed_range-filter");

    filterForm.addEventListener('input', (event) => {

        const currentFilterLabel = event.target.previousElementSibling;
        const currentLabelSpan = currentFilterLabel.querySelector('span');
        const currentInputValue = event.target.valueAsNumber;
        currentLabelSpan.innerText = currentInputValue;

        const attackValue = attackFilterInput.valueAsNumber;
        const defenseValue = defenseFilterInput.valueAsNumber;
        const speedValue = speedFilterInput.valueAsNumber;


        const filterPokemonArray = pokemonArray.filter((pokemon) => {
            return (
                pokemon.attack <= attackValue && 
                pokemon.defense <= defenseValue && 
                pokemon.speed <= speedValue
            );
        });
    
        console.log(filterPokemonArray);
        renderPokemonCards(filterPokemonArray)
    });

}

async function main(){
    handleDarkMode();
    const pokemonArray = await mountPokemonArray(100);
    // console.log(pokemonArray);
    renderPokemonCards(pokemonArray);
    // renderPokemonCards(pokemonList);
    // handleFavoriteEvent();
    handleStatFilter(pokemonArray);
}

main();