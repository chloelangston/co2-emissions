class Smoke {
	constructor() {
		this.x = random(65, 75);
		this.y = random(height/2 - 40, 50);
	}

	display() {
		fill(230);
    noStroke();
    circle(this.x, this.y, 6);
	}
}