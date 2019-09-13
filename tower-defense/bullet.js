class Bullet {
	position
	velocity
	desired
	steer
	isDead = false
	maxForce = 3
	maxSteer = 0.5
	target

	constructor(x, y, target) {
		this.position = new p5.Vector(x, y)
		this.velocity = p5.Vector
			.sub(target.position, this.position)
			.normalize()
			.mult(5)
		this.target = target
	}

	draw() {
		this.desired = p5.Vector
			.sub(this.target.position, this.position)
			.normalize()
			.mult(this.maxForce)

		this.steer = p5.Vector
			.sub(this.desired, this.velocity)
			.limit(this.maxSteer)

		this.velocity.add(this.steer)
		this.position.add(this.velocity)

		if (this.target.isDead) {
			this.isDead = true
		} else {
			if (this.target.position.dist(this.position) < 5) {
				this.isDead = true
				this.target.hit()
			}
		}

		fill('black')
		rectMode(CENTER)
		// circle(this.position.x, this.position.y, 6)
		let angle = atan2(this.velocity.y, this.velocity.x)

		push()
		translate(this.position.x, this.position.y)
		rotate(angle)
		rect(0, 0, 6, 4)
		pop()
	}
}
