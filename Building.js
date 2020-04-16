class Building {
	constructor() {
		this.x = random(0, width);
		this.y = random(height/2.75, height/2.75 - 100);
		this.width = random(10, 25);
		this.height = height/2.75 - this.y;
		this.alpha = random(100, 200);

		this.lightX = random(this.x+2, this.x + this.width-2);
		this.lightY = random(this.y, this.y + this.height);

		this.light2X = random(this.x+2, this.x + this.width-2);
		this.light2Y = random(this.y, this.y + this.height);

		this.light3X = random(this.x+2, this.x + this.width-2);
		this.light3Y = random(this.y, this.y + this.height);

		this.light4X = random(this.x+2, this.x + this.width-2);
		this.light4Y = random(this.y, this.y + this.height);

		this.light5X = random(this.x+2, this.x + this.width-2);
		this.light5Y = random(this.y, this.y + this.height);
	}

	display() {
		noStroke();
		fill(0, 0, 0, this.alpha);
		rect(this.x, this.y, this.width, this.height);
		fill(200, 150, 0, energy);
		circle(this.lightX, this.lightY, 3);
		circle(this.light2X, this.light2Y, 3);
		circle(this.light3X, this.light3Y, 3);
		circle(this.light4X, this.light4Y, 3);
		circle(this.light5X, this.light5Y, 3);
	}
}