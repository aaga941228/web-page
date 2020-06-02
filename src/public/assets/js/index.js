const coursesContainer = document.querySelector("#courses-container");
const moreCoursesButton = document.querySelector("#more-courses");
const frontList = document.querySelector("#front-list");
const backList = document.querySelector("#back-list");
const othersList = document.querySelector("#others-list");
const weatherStore = new WeatherStore();
const city = weatherStore.getLocation();
const weather = new Weather(city);
const weatherUi = new WeatherUi();
const pokemonStore = new PokemonStore();
const poke = pokemonStore.getPokemon();
const pokemon = new Pokemon(poke);
const pokemonUi = new PokemonUi();

function renderCourses(amount, list) {
  let index = 0;
  let items = amount;
  const coursesList = list;
  return function () {
    if (items >= coursesList.length) {
      items = coursesList.length;
      moreCoursesButton.classList.add("disabled");
      moreCoursesButton.textContent = "No more courses";
    }
    for (let i = index; i < items; i++) {
      const course = new Course(coursesList[i].name, coursesList[i].filename);
      course.render(coursesContainer);
    }
    index += amount;
    items += amount;
  };
}

function renderTehcnologies(technologies, nodes) {
  const legnth = technologies.length;
  for (let i = 0; i < legnth; i++) {
    technologies[i].map(function (tech) {
      nodes[i].innerHTML += `<li class="list-group-item"><p>${tech}</p></li>`;
    });
  }
}

async function fetchWeather() {
  const data = await weather.getWeather();
  weatherUi.render(data);
}

async function fetchPokemon() {
  const data = await pokemon.getPokemon();
  pokemonUi.render(data);
}

renderTehcnologies(technologies, [frontList, backList, othersList]);
const renderEightCourses = renderCourses(8, coursesList);
renderEightCourses();
fetchWeather();
fetchPokemon();

document
  .querySelector("#weather-change-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const city = document.querySelector("#city").value;
    weather.setLocation(city);
    weatherStore.setLocation(city);
    fetchWeather();
  });

document
  .querySelector("#pokemon-change-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const poke = document.querySelector("#pokemon").value;
    pokemon.setPokemon(poke);
    pokemonStore.setPokemon(poke);
    fetchPokemon();
  });

moreCoursesButton.addEventListener("click", function (e) {
  e.preventDefault();
  renderEightCourses();
});
