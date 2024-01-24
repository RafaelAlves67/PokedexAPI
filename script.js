const URL = 'https://pokeapi.co/api/v2/pokemon/';
const container = document.querySelector('.container');
const container2 = document.querySelector('.container2');
const input = document.querySelector('.btn_pesquisa');
const botao = document.querySelector('.botao');


// Gerar pokedex
function pokedex() {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            for (let i = 1; i <= 50; i++) {
                let pokemonURL = `${URL}${i}/`;

                fetch(pokemonURL)
                    .then(response => response.json())
                    .then(pokemon => {
                        let newCard = document.createElement('div');
                        newCard.innerHTML = `<div class="pokemon">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png" alt="" class="img-container">
                            <div class="info">
                                <span class="number">#${i}</span>
                                <h1 class="name">${pokemon.name}</h1>
                                <p class="type">Type: ${pokemon.types[0].type.name}</p>
                            </div>
                        </div>`;

                        container.appendChild(newCard);
                    });
            }
        }).catch(e => console.log('Erro com o sistema', e));

}
pokedex();


//Buscar Pokemon
function pesquisaPokemon() {
    botao.addEventListener('click', () => {
        let nomePokemon = input.value.toLowerCase(); // Converter para minúsculas
        let pokemonURL = `https://pokeapi.co/api/v2/pokemon/${nomePokemon}/`;

        fetch(pokemonURL)
            .then(response => response.json())
            .then(pokemon => {
                if (nomePokemon === pokemon.name.toLowerCase()) { // Comparação com minúsculas
                    let card = document.createElement('div');
                    card.innerHTML = `<div class="pokemon2">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="" class="img-container">
                        <div class="info">
                            <span class="number">#${pokemon.id}</span>
                            <h1 class="name">${pokemon.name}</h1>
                            <p class="type">Type: ${pokemon.types[0].type.name}</p>
                        </div>
                    </div>`;

                    container.innerHTML = ''; // Limpar o conteúdo anterior
                    container2.appendChild(card);
                    console.log(nomePokemon)
                } 
                
            })
            .catch(error => {
                container2.innerHTML = ''; 
                console.log('Erro com a API =>', error);
                let h1 = document.createElement('h1');
                h1.innerText = 'Pokemon não encontrado!';
                h1.classList.add('error');
                container.innerHTML = ''; // Limpar o conteúdo anterior
                container.appendChild(h1);
            });
    });
}

pesquisaPokemon();



