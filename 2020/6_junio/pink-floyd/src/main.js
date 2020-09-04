let bg
let line1
let line2

function preload() {
	bg = loadImage('assets/bg.png')
}

function setup() {
	createCanvas(1080, 1080)
	line1 = new Line(createVector(382, 590), createVector(-10, 100), 4, 'white')
	line2 = new Line(createVector(1100, 90), createVector(592, 618), 5, 'red')
	line3 = new Line(createVector(1100, 102), createVector(592, 628), 5, 'orange')
	line4 = new Line(createVector(1100, 114), createVector(595, 635), 5, 'yellow')
	line5 = new Line(createVector(1100, 126), createVector(599, 642), 5, 'rgb(0, 255, 0)')
	line6 = new Line(createVector(1100, 138), createVector(604, 649), 5, 'lightBlue')
	line7 = new Line(createVector(1100, 150), createVector(611, 654), 5, 'blue')
	line8 = new Line(createVector(1100, 162), createVector(619, 656), 5, 'violet')
}

function draw() {
	translate(0, 14 * sin(millis() / 500) - 15)
	background('black')
	image(bg, 0, 0)

	noFill()
	stroke('white')
	strokeWeight(2)

	line1.draw()
	line2.draw()
	line3.draw()
	line4.draw()
	line5.draw()
	line6.draw()
	line7.draw()
	line8.draw()
}

class Line {
	constructor(p1, p2, thickness, color) {
		this.p1 = p1
		this.p2 = p2
		this.thickness = thickness
		this.color = color
	}

	draw() {
		let weight = 8
		stroke(this.color)
		strokeWeight(this.thickness)
		beginShape()
		curveVertex(this.p1.x, this.p1.y)
		for (let t = 0; t < 1; t += 0.08) {
			let p = p5.Vector.lerp(this.p1, this.p2, t)
			if (t == 0) {
				curveVertex(p.x, p.y)
			} else {
				curveVertex(p.x + random(-weight, weight), p.y + random(-weight, weight))
			}
		}
		curveVertex(this.p2.x, this.p2.y)
		curveVertex(this.p2.x, this.p2.y)
		endShape()
	}
}
