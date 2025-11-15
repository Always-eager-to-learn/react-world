export class Point {
  x1: number
  y1: number

  constructor(x1: number, y1: number) {
    this.x1 = x1
    this.y1 = y1
  }

  draw(
    context: CanvasRenderingContext2D,
    option = { color: "#121212", size: 18 },
  ) {
    const radius = option.size / 2
    context.fillStyle = option.color
    context.beginPath()
    context.arc(this.x1, this.y1, radius, 0, Math.PI * 2)
    context.fill()
  }

  equals(point: Point) {
    return this.x1 === point.x1 && this.y1 === point.y1
  }
}
