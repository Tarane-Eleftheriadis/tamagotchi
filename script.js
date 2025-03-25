const createBtn = document.querySelector("#create-tamagotchi-button");
const tamagotchiNameInput = document.querySelector("#tamagotchi-name-input");
const tamagotchiType = document.querySelector("#tamagotchi-type-dropdown");
const tamagotchiBox = document.querySelector("#tamagotchi-box");
const tamagotchiDevice = document.querySelector("#tamagotchi-device");
const tamagotchiDeviceName = document.querySelector("#tamagotchi-device-name");

const createTamagotchi = () => {
  const name = tamagotchiNameInput.value.trim();
  const type = tamagotchiType.value;

  if (!name || !type) {
    alert("Ange namn och välj en Tamagotchi-typ!");
    return;
  }

  tamagotchiDevice.classList.remove("hide");
  tamagotchiDeviceName.textContent = name;

  const display = document.querySelector("#tamagotchi-display");
  display.innerHTML = "";

  const tamagotchiImg = document.createElement("img");
  tamagotchiImg.width = 80;

  switch (type) {
    case "dog":
      tamagotchiImg.src = "/img/dog.png";
      tamagotchiImg.alt = "Hund";
      break;
    case "unicorn":
      tamagotchiImg.src = "/img/unicorn.png";
      tamagotchiImg.alt = "Enhörning";
      break;
    case "elk":
      tamagotchiImg.src = "/img/elk.png";
      tamagotchiImg.alt = "Älg";
      break;
    case "bear":
      tamagotchiImg.src = "/img/bear.png";
      tamagotchiImg.alt = "Björn";
      break;
  }

  display.appendChild(tamagotchiImg);
};


createBtn.addEventListener("click", createTamagotchi);