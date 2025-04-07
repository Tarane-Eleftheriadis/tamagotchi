const nameInput = document.querySelector("#tamagotchi-name-input");
const typeInput = document.querySelector("#tamagotchi-type-dropdown");
const createBtn = document.querySelector("#create-tamagotchi-button");
const tamagotchiContainer = document.querySelector("#tamagotchi-container");
const historyLog = document.querySelector("#history");

let tamagotchis = [];

const createTamagotchi = () => {
  const name = nameInput.value;
  const animalType = typeInput.value;

  if (!name || !animalType) {
    alert("Du måste ange namn och välja en Tamagotchi");
    return;
  }

  if (tamagotchis.some(t => t.name === name)) {
    alert("Det finns redan en Tamagotchi med det namnet, välj ett annat namn!");
    return;
  }

  if (tamagotchis.length >= 4) {
    alert("Du kan bara ha 4 Tamagotchis åt gången!");
    return;
  }

  const newTamagotchi = new Tamagotchi(name, animalType);
  tamagotchis.push(newTamagotchi);
  console.log(tamagotchis)

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
    this.tamagotchiDevice = document.createElement("div");
    this.tamagotchiDevice.classList.add("tamagotchi-device");
    this.tamagotchiDevice.innerHTML = `
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
  
    this.tamagotchiDevice.querySelector(".eat").addEventListener("click", () => {
      this.updateLifeStatus({ fullness: +30, happiness: +5, energy: -15 });
      this.logActivity(`Du matade ${this.name}.`);
    });

    this.tamagotchiDevice.querySelector(".nap").addEventListener("click", () => {
      this.updateLifeStatus({ energy: +40, happiness: -10, fullness: -10 });
      this.logActivity(`Du tog en tupplur med ${this.name}.`);
    });

    this.tamagotchiDevice.querySelector(".play").addEventListener("click", () => {
      this.updateLifeStatus({ happiness: +30, energy: -10, fullness: -10 });
      this.logActivity(`Du lekte med ${this.name}.`);
    });
  
    tamagotchiContainer.append(this.tamagotchiDevice);
    this.lifeStatus();
  }
  
  lifeStatus() {
    this.tamagotchiDevice.querySelector(".energy").textContent = this.energy;
    this.tamagotchiDevice.querySelector(".fullness").textContent = this.fullness;
    this.tamagotchiDevice.querySelector(".happiness").textContent = this.happiness;
  }

  updateLifeStatus(changes) {
    this.energy = this.energy + changes.energy;
    this.fullness = this.fullness + changes.fullness;
    this.happiness = this.happiness + changes.happiness;
  
    this.energy = Math.min(Math.max(this.energy, 0), 100);
    this.fullness = Math.min(Math.max(this.fullness, 0), 100);
    this.happiness = Math.min(Math.max(this.happiness, 0), 100);
  
    this.lifeStatus();
    this.checkStatus();
  }

  checkStatus() {
    if (this.energy === 0 || this.fullness === 0 || this.happiness === 0) {
      this.logActivity(`${this.name} tröttnade på livet här och drog vidare.. `);
      
      clearInterval(this.timer);
      this.tamagotchiDevice.remove();
      tamagotchis = tamagotchis.filter(t => t.id !== this.id);
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.updateLifeStatus({ energy: -15, fullness: -15, happiness: -15 });
    }, 10000);
  }

  logActivity(message) {
    const log = document.createElement("p");
    log.textContent = message;
    historyLog.prepend(log);
  }
}

createBtn.addEventListener("click", createTamagotchi);
