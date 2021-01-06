class Post {
  constructor(x, y, color, ratio) {
    this.position = createVector(x, y)
    this.color = color
    this.ratio = ratio
    this.w = 100 * sqrt(this.ratio)
    this.h = 10000 / this.w

    this.velocity = createVector()

    this.scale = 0
  }

  draw() {
    this.scale += 0.06
    if (this.scale > 1) this.scale = 1

    fill(this.color)
    push()
    translate(this.position.x, this.position.y)
    rect(0, 0, this.w * this.scale, this.h * this.scale)
    pop()
  }

  organize() {
    let totalDesired = createVector()
    let totalEvade = createVector()
    let totalAtract = createVector()

    // fuerzas evade
    posts.forEach((post, i) => {
      if (this.collideWith(post)) {
        let desired = this.position.copy().sub(post.position).normalize().mult(3)
        totalEvade.add(desired)
      }
    })

    // fuerzas de atracción
    // posts.forEach((post, i) => {
    //   let distance = this.position.copy().sub(post.position).mag()
    //   if (this.color == post.color && distance > 0) {
    //     let desired = post.position.copy().sub(this.position).normalize().mult(100 / distance)
    //     totalAtract.add(desired)
    //   }
    // })

    totalDesired = totalEvade.mult(1).add(totalAtract.mult(1))

    let steer = totalDesired.copy().sub(this.velocity).limit(0.5)
    this.velocity.add(steer)
    this.position.add(this.velocity)
  }

  collideWith(other) {
    let gap = 20
    return (
      this.position.x + this.w / 2 + gap > other.position.x - other.w / 2 &&
      this.position.x - this.w / 2 - gap < other.position.x + other.w / 2 &&
      this.position.y + this.h / 2 + gap > other.position.y - other.h / 2 &&
      this.position.y - this.h / 2 - gap < other.position.y + other.h / 2
    )
  }
}
