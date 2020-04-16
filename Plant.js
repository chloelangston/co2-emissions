class Plant {
  constructor(){
    this.x = random(0, width-10);
    this.y = random(height/3, height/2);
    this.width = random(10, 20);
    this.height = random(10, 20);
  }
  
  display() {
    fill(55, 182, 0);
    noStroke();
    ellipse(this.x, this.y, this.width, this.height);
    stroke(155, 155, 155);
    line(this.x, this.y, this.x, this.y + (this.width/2)*2);
  }
}