const pokemonList = document.getElementById("pokemonList");
const pokemonImage = document.getElementById("pokemonImage");
const pokemonName = document.getElementById("pokemonName");
const pokemonTypes = document.getElementById("pokemonTypes");
const pokemonHeight = document.getElementById("pokemonHeight");
const pokemonWeight = document.getElementById("pokemonWeight");
const pokemonSkills = document.getElementById("pokemonSkills");

const firstGenFirstStage = [
  "bulbasaur", "charmander", "squirtle", "caterpie", "weedle", "pidgey", "rattata", "spearow", "ekans", "sandshrew"
];

async function loadPokemons() {
  for (const name of firstGenFirstStage) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    const pokemonItem = document.createElement("div");
    pokemonItem.classList.add("pokemon-item");

    pokemonItem.innerHTML = `
      <img src="${data.sprites.front_default}" alt="${data.name}" />
      <div>${data.name}</div>
    `;

    // Atualizado: busca dados da API ao clicar
    pokemonItem.addEventListener("click", async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar dados do Pokémon.");
        }
        const data = await response.json();

        pokemonImage.src = data.sprites.front_default;
        pokemonName.textContent = data.name;
        pokemonTypes.textContent = data.types.map(type => type.type.name).join(", ");
        pokemonHeight.textContent = (data.height / 10).toFixed(1);
        pokemonWeight.textContent = (data.weight / 10).toFixed(1);
        pokemonSkills.textContent = data.abilities.map(ability => ability.ability.name).join(", ");
      } catch (error) {
        alert("Erro ao carregar dados do Pokémon.");
        console.error(error);
      }
    });

    pokemonList.appendChild(pokemonItem);
  }
}

document.getElementById("searchButton").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.toLowerCase();

  if (!query) {
    alert("Digite o nome de um Pokémon!");
    return;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Pokémon não encontrado");
      }
      return response.json();
    })
    .then((data) => {
      pokemonImage.src = data.sprites.front_default;
      pokemonName.textContent = data.name;
      pokemonTypes.textContent = data.types.map(type => type.type.name).join(", ");
      pokemonHeight.textContent = (data.height / 10).toFixed(1);
      pokemonWeight.textContent = (data.weight / 10).toFixed(1);
      pokemonSkills.textContent = data.abilities.map(ability => ability.ability.name).join(", ");
    })
    .catch((error) => {
      alert(error.message);
    });
});

document.getElementById("searchInput").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    document.getElementById("searchButton").click();
  }
});

loadPokemons();
