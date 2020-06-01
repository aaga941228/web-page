class PokemonStore {
  constructor() {
    this.pokemon;
    this.defaultPokemon = "pikachu";
  }

  getPokemon() {
    if (localStorage.getItem("pokemon") === null) {
      this.pokemon = this.defaultPokemon;
    } else {
      this.pokemon = localStorage.getItem("pokemon");
    }
    return this.pokemon;
  }

  setPokemon(pokemon) {
    localStorage.setItem("pokemon", pokemon);
  }
}

class Pokemon {
  constructor(pokemon) {
    this.pokemon = pokemon;
    this.apiURL = "https://pokeapi.co/api/v2/pokemon";
  }
  async getPokemon() {
    const response = await fetch(`${this.apiURL}/${this.pokemon}`);
    const data = await response.json();
    const poke = {
      name: data.species.name,
      type: data.types[0].type.name,
      imageURL: data.sprites.front_default,
    };
    return poke;
  }

  setPokemon(pokemon) {
    this.pokemon = pokemon;
  }
}

class PokemonUi {
  constructor() {
    this.name = document.getElementById("pokemon-name");
    this.type = document.getElementById("pokemon-type");
    this.image = document.getElementById("pokemon-image");
  }

  render(pokemon) {
    this.name.textContent = `Name: ${pokemon.name}`;
    this.type.textContent = `Type: ${pokemon.type}`;
    this.image.setAttribute("src", pokemon.imageURL);
  }
}
