class Sea {
  constructor() {
    this.x = 0;
    this.y = height;
  }
  
  display() {
  	let rise = (tempIncreaseForScale*4).toFixed(2);
    fill(0, 205, 255);
    rect(this.x, this.y - 100 - rise, width, 100 + rise);
    fill(255);
    text('Sea level up: ' + rise + " ft", 50, this.y - 80 - rise);
  }
}