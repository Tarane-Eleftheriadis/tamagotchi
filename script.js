
const createBtn = document.querySelector("#create-tamagotchi-button");
const nameInput = document.querySelector("#tamagotchi-name-input");
const typeInput = document.querySelector("#tamagotchi-type-dropdown");
const tamagotchiContainer = document.querySelector("#tamagotchi-container");
const historyLog = document.querySelector("#history");

let tamagotchis = [];

const createTamagotchi = () => {
  const name = nameInput.value;
  const type = typeInput.value;

  if (!name || !type) {
    alert("Du måste ange namn och välja en Tamagotchi 😊");
    return;
  }

  if (tamagotchis.length >= 4) {
    alert("Du kan bara ha 4 tamagotchis åt gången!");
    return;
  }

  const newTamagotchi = new Tamagotchi(name, type);
  tamagotchis.push(newTamagotchi);

  nameInput.value = "";
  typeInput.value = "";
};

class Tamagotchi {
  constructor(name, animalType) {
    this.name = name;
    this.animalType = animalType;
    this.energy = 50;
    this.fullness = 50;
    this.happiness = 50;
    this.id = name;

    this.createTamagotchiDOM();
    this.startTimer();
  }

  createTamagotchiDOM() {
    this.element = document.createElement("div");
    this.element.classList.add("tamagotchi-device");
    this.element.innerHTML = `
      <p class="tamagotchi-device-name">${this.name}</p>
      <div class="tamagotchi-display">
        <img src="/img/${this.animalType}.png" height="80" alt="${this.animalType}" />
        <div class="tamagotchi-results">
          <p class="result">Energy: <span class="energy">${this.energy}</span></p>
          <p class="result">Fullness: <span class="fullness">${this.fullness}</span></p>
          <p class="result">Happiness: <span class="happiness">${this.happiness}</span></p>
        </div>
      </div>
      <div class="buttons-container">
        <div>
          <button class="button-activity eat">
            <img src="/img/burger.png" width="25px">
          </button>
        </div>
        <div class="middle-button">
          <button class="button-activity nap">
            <img src="/img/moon.png" width="25px">
          </button>
        </div>
        <div>
          <button class="button-activity play">
            <img src="/img/heart.png" width="25px">
          </button>
        </div>
      </div>
    `;
  
    this.element.querySelector(".eat").addEventListener("click", () => this.eat());
    this.element.querySelector(".nap").addEventListener("click", () => this.nap());
    this.element.querySelector(".play").addEventListener("click", () => this.play());
  
    tamagotchiContainer.append(this.element);
    this.updateResult();
  }
  
  updateResult() {
    this.element.querySelector(".energy").textContent = this.energy;
    this.element.querySelector(".fullness").textContent = this.fullness;
    this.element.querySelector(".happiness").textContent = this.happiness;
  }
  

  logActivity(message) {
    const log = document.createElement("p");
    log.textContent = message;
    historyLog.prepend(log);
  }

  updateStats(delta) {
    this.energy += delta.energy || 0;
    this.fullness += delta.fullness || 0;
    this.happiness += delta.happiness || 0;
  
    this.energy = Math.min(Math.max(this.energy, 0), 100);
    this.fullness = Math.min(Math.max(this.fullness, 0), 100);
    this.happiness = Math.min(Math.max(this.happiness, 0), 100);
  
    this.updateResult();
    this.checkStatus();
  }
  

  nap() {
    this.updateStats({ energy: +40, happiness: -10, fullness: -10 });
    this.logActivity(`Du tog en tupplur med ${this.name}.😴`);
  }

  play() {
    this.updateStats({ happiness: +30, energy: -10, fullness: -10 });
    this.logActivity(`Du lekte med ${this.name}.🎮`);
  }

  eat() {
    this.updateStats({ fullness: +30, happiness: +5, energy: -15 });
    this.logActivity(`Du matade ${this.name}.🍔`);
  }

  checkStatus() {
    if (this.energy === 0 || this.fullness === 0 || this.happiness === 0) {
      this.logActivity(`${this.name} sprang iväg på grund av misskötsel 💔`);
      this.remove();
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.updateStats({ energy: -15, fullness: -15, happiness: -15 });
    }, 10000);
  }

  remove() {
    clearInterval(this.timer);
    this.element.remove();
    tamagotchis = tamagotchis.filter(t => t.id !== this.id);
  }
}

createBtn.addEventListener("click", createTamagotchi);
