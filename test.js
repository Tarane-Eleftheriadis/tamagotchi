class Tamagotchi {
    constructor(name, animalType) {
      this.name = name;
      this.animalType = animalType;
      this.energy = 50;
      this.fullness = 50;
      this.happiness = 50;
      this.id = Date.now(); // Unikt ID för varje djur
      this.timer = setInterval(() => this.decreaseStats(), 10000); // Starta timer
    }
  
    // Minskar stats automatiskt var 10:e sekund
    decreaseStats() {
      this.energy -= 15;
      this.fullness -= 15;
      this.happiness -= 15;
      this.updateUI();
      this.checkStatus();
    }
  
    // Nap - ökar energy, minskar happiness och fullness
    nap() {
      this.energy += 40;
      this.happiness -= 10;
      this.fullness -= 10;
      this.logActivity(`You took a nap with ${this.name}!`);
      this.updateUI();
      this.checkStatus();
    }
  
    // Play - ökar happiness, minskar fullness och energy
    play() {
      this.happiness += 30;
      this.fullness -= 10;
      this.energy -= 10;
      this.logActivity(`You played with ${this.name}!`);
      this.updateUI();
      this.checkStatus();
    }
  
    // Eat - ökar fullness och happiness, minskar energy
    eat() {
      this.fullness += 30;
      this.happiness += 5;
      this.energy -= 15;
      this.logActivity(`You fed ${this.name}!`);
      this.updateUI();
      this.checkStatus();
    }
  
    // Uppdatera UI
    updateUI() {
      const petElement = document.querySelector(`#pet-${this.id}`);
      if (petElement) {
        petElement.querySelector(".energy").textContent = `Energy: ${this.energy}`;
        petElement.querySelector(".fullness").textContent = `Fullness: ${this.fullness}`;
        petElement.querySelector(".happiness").textContent = `Happiness: ${this.happiness}`;
      }
    }
  
    // Kollar om husdjuret måste tas bort
    checkStatus() {
      if (this.energy <= 0 || this.fullness <= 0 || this.happiness <= 0) {
        clearInterval(this.timer); // Stoppa timern
        document.querySelector(`#pet-${this.id}`).remove(); // Ta bort från DOM
        logActivity(`${this.name} ran away due to neglect!`);
      }
    }
  
    // Logga aktivitet i historik
    logActivity(message) {
      const history = document.querySelector("#history");
      history.innerHTML += `<p>${message}</p>`;
    }
  }
  
  // Lista med husdjur
  const pets = [];
  
  // Skapa ett nytt husdjur
  function createPet() {
    if (pets.length >= 4) {
      alert("You can only have up to 4 pets!");
      return;
    }
  
    const name = document.querySelector("#pet-name").value.trim();
    const animalType = document.querySelector("#animal-type").value;
  
    if (!name) {
      alert("Please enter a name for your pet!");
      return;
    }
  
    const newPet = new Tamagotchi(name, animalType);
    pets.push(newPet);
    renderPet(newPet);
  }
  
  // Lägg till husdjuret i DOM
  function renderPet(pet) {
    const petContainer = document.querySelector("#pets");
    const petElement = document.createElement("div");
    petElement.id = `pet-${pet.id}`;
    petElement.classList.add("pet-display");
    petElement.innerHTML = `
      <h2>${pet.name} (${pet.animalType})</h2>
      <p class="energy">Energy: ${pet.energy}</p>
      <p class="fullness">Fullness: ${pet.fullness}</p>
      <p class="happiness">Happiness: ${pet.happiness}</p>
      <button onclick="getPet(${pet.id}).nap()">img</button>
      <button onclick="getPet(${pet.id}).play()">Play</button>
      <button onclick="getPet(${pet.id}).eat()">Eat</button>
    `;
    petContainer.appendChild(petElement);
  }
  
  // Hämta ett husdjur från listan baserat på ID
  function getPet(id) {
    return pets.find(pet => pet.id === id);
  }
  
  // Logga aktivitet i historik
  function logActivity(message) {
    const history = document.querySelector("#history");
    history.innerHTML += `<p>${message}</p>`;
  }
  