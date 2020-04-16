class Co2 {
  constructor() {
    this.x = random(0, width-10);
    this.y = random(0, height/3);
  }
  
  display() {
    fill(203, 80, 42, 50);
    noStroke();
    circle(this.x, this.y, 3);
  }
}