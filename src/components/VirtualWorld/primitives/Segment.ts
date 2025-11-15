import type { Point } from "./Point"

export class Segment {
  point1: Point
  point2: Point

  constructor(p1: Point, p2: Point) {
    this.point1 = p1
    this.point2 = p2
  }

  draw(
    context: CanvasRenderingContext2D,
    options = { color: "#121212", width: 2 },
  ) {
    context.beginPath()
    context.lineWidth = options.width
    context.strokeStyle = options.color
    context.moveTo(this.point1.x1, this.point1.y1)
    context.lineTo(this.point2.x1, this.point2.y1)
    context.closePath()
    context.stroke()
  }

  equals(seg: Segment) {
    return this.includes(seg.point1) && this.includes(seg.point2)
  }

  includes(point: Point) {
    return this.point1.equals(point) || this.point2.equals(point)
  }
}
