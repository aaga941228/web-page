const coursesContainer = document.querySelector("#courses-container");
const weatherStore = new WeatherStore();
const city = weatherStore.getLocation();
const weather = new Weather(city);
const weatherUi = new WeatherUi();
const pokemonStore = new PokemonStore();
const poke = pokemonStore.getPokemon();
const pokemon = new Pokemon(poke);
const pokemonUi = new PokemonUi();

function courseTemplate(course) {
  return `
    <div class="col-md-4">
      <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" src="/statics/assets/images/certificates/${course.filename}" data-holder-rendered="true">
      <div class="card-body">
        <p class="card-text">${course.name}</p>
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-secondary"><a href="/statics/assets/images/certificates/${course.filename}" target="_blank">View</a></button>
        </div>
      </div>
    </div>
  `;
}

function renderCourses(courses) {
  courses.map((course) => {
    coursesContainer.innerHTML += courseTemplate(course);
  });
}

async function fetchWeather() {
  const data = await weather.getWeather();
  weatherUi.render(data);
}

async function fetchPokemon() {
  const data = await pokemon.getPokemon();
  pokemonUi.render(data);
}

renderCourses(courses);
fetchWeather();
fetchPokemon();

document.getElementById("weather-change-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const city = document.querySelector("#city").value;
  weather.setLocation(city);
  store.setLocation(city);
  fetchWeather();
});

document.getElementById("pokemon-change-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const poke = document.querySelector("#pokemon").value;
  pokemon.setPokemon(poke);
  pokemonStore.setPokemon(poke);
  fetchPokemon();
});
