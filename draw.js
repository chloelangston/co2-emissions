function drawHill(xStart, xEnd, yStart, yEnd, green) {
  fill(0, green, 0);
  noStroke();
  beginShape();
  curveVertex(xStart, yStart);
  curveVertex(xStart, yStart);
  curveVertex(xStart+(xStart/4), yEnd);
  curveVertex(xStart+xEnd/4, yEnd+(yEnd/5));
  curveVertex(xStart+xEnd/2, yEnd+(yEnd/7));
  curveVertex(xEnd, yStart);
  curveVertex(xEnd, yStart);
  endShape();
}

function drawPowerStation() {
	fill(180);
	rect(10, height/2 - 20, 80, 40);
	//chimney
	rect(60, height/2 - 40, 20, 20)
}

function drawHouse(x, y) {
  fill(220, 220,255);
  stroke(20, 100, 240);
  
  //house
  rect(width - 200, height/2 + (height/10), 100, 100);

  //chimney
  rect(width - 190, height/2 + (height/15), 15, 20);

  //roof
  triangle(width - 200, height/2 + (height/10), width - 150, height/2 + (height/18), width - 100, height/2 + (height/10));
  
  //door
  rect(width - 180, height/2 + (height/10) + 70, 20, 30);
  
  //door knob
  ellipse(width - 175, height/2 + (height/10) + 80, 5, 5);
  
  //window
  fill(200, 180, 0, energy);
  rect(width - 140, height/2 + (height/10) + 15, 20, 20);
}

function drawBuildings() {
	for (let i=0; i<width; i++) {
		if (i%10 == 0) {
			fill(0);
			rect(i, height/4, 10, ((i + 1)%10)*3);
		}
	}
}

function drawWindmill(x, y, radius1, radius2) {
  let numberOfPoints = 3;
  let angle = TWO_PI / numberOfPoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let i = 0; i < TWO_PI; i += angle) {
    let sx = x + cos(i) * radius2;
    let sy = y + sin(i) * radius2;
    vertex(sx, sy);
    sx = x + cos(i + halfAngle) * radius1;
    sy = y + sin(i + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}