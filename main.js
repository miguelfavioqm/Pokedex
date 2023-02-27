let app = document.querySelector(".app")
let btnSearch = document.getElementById("btn-search")
let input = document.getElementById("input")

btnSearch.addEventListener("click", ()=>{
  let pokemon = input.value.toLowerCase()
  if (pokemon!==""){
    console.log(pokemon)
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  .then(response => {
    if(response.status==200){
      return(response.json())
    }else{
      alert("Algo salio mal\nVerifica el nombre")
    }
    })
  .then(data => {
    console.log(data)
    createCard(data)})
  }else{
    alert("INTRODUCE EL NOMBRE DE UN POKEMON PARA BUSCARLO")
  }
  
})


function createCard(data){
  let card = document.createElement("div");
  card.classList.add("card")
  card.classList.add(`${data.types[0].type.name}`)
  //aca verificamos el tipo de pokemon para darle el respectivo color
  console.log(data.types[0].type.name)


  let cardTitle = document.createElement("h1");
  cardTitle.innerText = data.name
  cardTitle.classList.add("card-title")
  card.appendChild(cardTitle)
  let cardImg = document.createElement("img");
  cardImg.src = data.sprites.front_default
  card.appendChild(cardImg)
  let cardType = document.createElement("div");
  cardType.classList.add("card-type")
  cardType.innerHTML = `<h2>type</h2><p>${data.types[0].type.name}</p>`
  card.appendChild(cardType)
  let cardAbilities = document.createElement("div");
  cardAbilities.classList.add("card-abilites")
  cardAbilities.innerHTML = `<h2>abilities</h2><p>${data.abilities[0].ability.name}</p><p>${data.abilities[1].ability.name}</p>`
  card.appendChild(cardAbilities)
  let titleStats = document.createElement("h2")
  titleStats.textContent = "stats"
  card.appendChild(titleStats)

  let cardStatsContainer = document.createElement("div")
  cardStatsContainer.classList.add("card-statscontainer")
  let cardStatsContainerNames = document.createElement("div")
  cardStatsContainerNames.classList.add("card-statscontainer-names")
  cardStatsContainerNames.innerHTML = `<p>hp</p>
  <p>damage</p>
  <p>defense</p>
  <p>sp attack</p>
  <p>sp defense</p>
  <p>speed</p>
  `
  cardStatsContainer.appendChild(cardStatsContainerNames)
  let cardStatsContainerBars = document.createElement("div")
  cardStatsContainerBars.classList.add("card-statscontainer-bars")

  for (let i = 0; i < 6; i++) {
    let div = document.createElement("div")
    div.classList.add("progress", "mb-3")
    div.role = "progressbar";
    div.ariaLabel = "Animated striped example";
    div.ariaValueNow = data.stats[i].base_stat;
    div.ariaValueMin = "0";
    div.ariaValueMax = "100";
    div.innerHTML = `<div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" style="width: ${data.stats[i].base_stat
    }%">
    </div>`
    cardStatsContainerBars.appendChild(div) 
  }
  cardStatsContainer.appendChild(cardStatsContainerBars)
  let cardStatsContainerNumbers = document.createElement("div")
  cardStatsContainerNumbers.classList.add("card-statscontainer-numbers")
  for (let i = 0; i < 6; i++){
    let p = document.createElement("p")
    p.textContent = data.stats[i].base_stat
    cardStatsContainerNumbers.appendChild(p)
  }
  cardStatsContainer.appendChild(cardStatsContainerNumbers)
  card.appendChild(cardStatsContainer)
  app.insertAdjacentElement("afterbegin", card);
}