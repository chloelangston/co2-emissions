let numberOfCars = 25;
let numberOfPlants = 60;
let energy = 100;
let ffEnergy = 20;
let numberOfBuildings = 100;
let numberOfWindmills;
let amountOfCo2;
let temperature;
let seaLevel;

let cars = [];
let co2 = [];
let plants = [];
let smoke = [];
let buildings = [];
let windmills = [];

let carSlider;
let plantSlider;
let energySlider;
let ffSlider;
let button;

let frameCountRotate;

function setup() {
  createCanvas(windowWidth, windowHeight);
 
  carSlider = createSlider(0, 900, numberOfCars);
  carSlider.position(10, 10);
  carSlider.style('width', '80px');
  
  plantSlider = createSlider(0, 255, numberOfPlants);
  plantSlider.position(10, 60);
  plantSlider.style('width', '80px');

  energySlider = createSlider(0, 900, energy);
  energySlider.position(150, 10);
  energySlider.style('width', '80px');

  ffEnergySlider = createSlider(0, 100, ffEnergy);
  ffEnergySlider.position(150, 60);
  ffEnergySlider.style('width', '80px');
  
  button = createButton('Source');
  button.position(width-100, height - (height/2.25));
  button.mousePressed(openLink);

  setCars();
  setPlants();
  setCo2();
  setSeaLevel();
  setSmoke();
  setBuildings();
  setWindmills();
}

function draw() {
  background(220, 0, 0, 0);
  manageTemperature();
  
  for(let i = 0; i < amountOfCo2; i++) {
    co2[i].display();
  }

  for(let i = 0; i < numberOfBuildings; i++) {
    buildings[i].display();
  }

  drawHill(width-(width/1.5), width, height/2.5, height/3.5, 75);
  drawHill(0, width/1.25, height/2.4, height/3.5, 65);
  drawHill(width-(width/1.9), width, height/2.4, height/3.4, 70);
  drawHill(0, width/1.25, height/2, height/3, 60);
  drawHill(width-(width/1.9), width, height/2, height/3, 80);

  drawPowerStation();

  let newCarSliderValue = carSlider.value();
  let newPlantSliderValue = plantSlider.value();
  let newEnergySliderValue = energySlider.value();
  let newFfEnergySliderValue = ffEnergySlider.value();

  if (newCarSliderValue != numberOfCars) {
    resetFactors(newCarSliderValue, numberOfCars, cars, Car);
    numberOfCars = newCarSliderValue;
    
    resetCo2();
  }

  if (newPlantSliderValue != numberOfPlants) {
    resetFactors(newPlantSliderValue, numberOfPlants, plants, Plant);
    numberOfPlants = newPlantSliderValue;
    
    resetCo2();
  }

  if (newFfEnergySliderValue != ffEnergy) {
    resetFactors(newFfEnergySliderValue, ffEnergy, smoke, Smoke);
   	ffEnergy = newFfEnergySliderValue;

   	newWindmillSliderValue = calcWindmills(ffEnergy);
    resetFactors(newWindmillSliderValue, numberOfWindmills, windmills, Windmill);
    numberOfWindmills = newWindmillSliderValue;

    resetCo2();
  }

  if (newEnergySliderValue != energy) {
  	energy = newEnergySliderValue;

    resetCo2();
  }
  
  for(let i = 0; i < numberOfCars; i++) {
    cars[i].display();
  }

  drawHouse();

  for(let i = 0; i < numberOfPlants; i++) {
    plants[i].display();
  }

  for(let i = 0; i < ffEnergy; i++) {
    smoke[i].display();
  }

  seaLevel.display();

  for(let i = 0; i < numberOfWindmills; i++) {
    windmills[i].display();
  }

  createSliderLabel(carSlider, numberOfCars + ",000 Cars");
  createSliderLabel(plantSlider, numberOfPlants + ",000 Trees");
  createSliderLabel(energySlider, energy + ",000 MWh Electricity");
  createSliderLabel(ffEnergySlider, ffEnergy + "% from Fossil Fuels");
}

function setCars() {
  for(let i = 0; i < numberOfCars; i++) {
    cars.push(new Car());
  }
}

function resetFactors(newValue, currentValue, array, factor) {
  let change = newValue-currentValue;
  
  if (change > 0) {
    for(let i = 0; i < change; i++) {
      array.push(new factor());
    }
    
  } else {
    for(let i = 0; i < abs(change); i++) {
      array.pop();
    }
  }
}

function setPlants() {
  for(let i = 0; i < numberOfPlants; i++) {
    plants.push(new Plant());
  }
}

function setSmoke() {
  for(let i = 0; i < ffEnergy; i++) {
    smoke.push(new Smoke());
  }
}

function setBuildings() {
  for(let i = 0; i < numberOfBuildings; i++) {
    buildings.push(new Building());
  }
}

function setWindmills() {
  numberOfWindmills = calcWindmills(ffEnergy);
  for(let i = 0; i < numberOfWindmills; i++) {
    windmills.push(new Windmill());
  }
}

function calcWindmills(ffEnergy) {
	return round((255 - ffEnergy) / 10);
}

// 1 particle = 100,000 lbs CO2
function calculateCo2() {
	let carEmissions = calcCarEmissions();
	let electricityEmissions = calcElectricityEmissions();
	let emissions = carEmissions + electricityEmissions;
	let emissionsAfterPlants = calcPlantRemoval(emissions);

  return emissionsAfterPlants;
}

function calcCarEmissions() {
	const gasCarEmissionRate = 11;
	const electricCarEmissionRate = 5;

	let gasCars = round((numberOfCars*ffEnergy)/100);
	let electricCars = numberOfCars - gasCars;
	let gasCarEmissions = numberOfCars*gasCarEmissionRate;
	let electricCarEmissions = numberOfCars*electricCarEmissionRate;

	// DOTO add /100
	return round((gasCarEmissions + electricCarEmissions)/10);
}

function calcElectricityEmissions() {
	const ffElectricityEmissionRate = 1;
	const renewableElectricityEmissionRate = 0.002;

	let ffElectricity = round((energy*ffEnergy)/100);
	let renewableElectricity = energy - ffElectricity;
	let ffElecEmissions = ffElectricity*ffElectricityEmissionRate;
	let renewableElecEmissions = round(renewableElectricity*renewableElectricityEmissionRate);

	// TODO: add *10
	return (ffElecEmissions + renewableElecEmissions)*10;
}

function calcPlantRemoval(emissions) {
	let plantsForScale = round(numberOfPlants/10);
	let amountRemoved = round((emissions*(20+plantsForScale))/100);
	let newEmissions = emissions - amountRemoved;

	return newEmissions;
}

function setCo2() {
  amountOfCo2 = calculateCo2();
  for(let i = 0; i < amountOfCo2; i++) {
    co2.push(new Co2());
  }
}

function resetCo2() {
    let newAmountOfCo2 = calculateCo2();
    resetFactors(newAmountOfCo2, amountOfCo2, co2, Co2);
    amountOfCo2 = newAmountOfCo2;
}

function setSeaLevel() {
  seaLevel = new Sea();
}

function manageTemperature() {
  tempIncreaseForScale = (amountOfCo2*2)/2276;
  temperature = 58.62 + tempIncreaseForScale;

  colorTemp = ((tempIncreaseForScale*100)/6) + 70;
  color1 = color(255, 255-(colorTemp), 0);
  color2 = color(255);
  createGradient(color1, color2);

  let tempText = "Temperature : " + temperature.toFixed(2) + " F";
  noStroke();
  fill(255);
  text(tempText, width-150, 30);
}

function createSliderLabel(slider, value) {
  textSize(12);
  fill(0, 102, 153);
  text(value, slider.x, slider.y + 40);
}

function createGradient(color1, color2) {
  noFill();
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color1, color2, inter);
    stroke(c);
    line(0, i, width, i);
  }
}

function openLink() {
	window.open("transportation.html");
}
