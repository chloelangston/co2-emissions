class Windmill {
	constructor() {
		this.x = random(width*2/3, width*9/10);
		this.y = random(height/2.5, height/3);
	}

	display() {
		fill(255);
		noStroke();
		push();
		translate(this.x, this.y);
  	rotate(frameCount/220.0);
  	drawWindmill(0, 0, 2, 12);
  	pop();
	}
}