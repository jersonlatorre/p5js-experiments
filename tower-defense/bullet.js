class Bullet {
	position
	velocity = new p5.Vector(0, 0)
	desired
	steer
	maxForce = 3
	maxSteer = .3
	target
	isDead = false

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
			if (
				dist(
					this.target.position.x,
					this.target.position.y,
					this.position.x,
					this.position.y
				) < 10
			) {
				this.isDead = true
				this.target.hit()
			}
		}

		fill('black')
		circle(this.position.x, this.position.y, 6)
	}
}