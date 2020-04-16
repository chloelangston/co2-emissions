class Car {
  constructor() {
    this.x = random(0, width);
    this.y = random(height - (height/2.25), height - (height/2.25) + 5);
    this.color = color(150);
  }
  
  display() {
    stroke(180);
		fill(this.color);
		rect(this.x, this.y, 26, 7);
		quad(this.x + 9, this.y - 4, this.x + 19, this.y - 4, this.x + 21, this.y, this.x + 7, this.y);
  }
}