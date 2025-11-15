import { Point } from "../primitives/Point"
import { Segment } from "../primitives/Segment"

export class Graph {
  points: Point[]
  segments: Segment[]

  constructor(points: Point[] = [], segments: Segment[] = []) {
    this.points = points
    this.segments = segments
  }

  draw(context: CanvasRenderingContext2D) {
    this.segments.forEach((segment) => segment.draw(context))
    this.points.forEach((point) => point.draw(context))
  }

  addPoint(point: Point) {
    this.points.push(point)
  }

  containsPoint(pointc: Point) {
    return this.points.find((point) => point.equals(pointc))
  }

  tryAddPoint(point: Point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point)
      return true
    }
    return false
  }

  addSegment(seg: Segment) {
    this.segments.push(seg)
  }

  createSegment(p1: Point, p2: Point) {
    return new Segment(p1, p2)
  }

  tryAddSegment(p1: Point, p2: Point) {
    const segment = this.createSegment(p1, p2)
    if (!this.containsSegment(segment)) {
      this.addSegment(segment)
      return true
    }
    return false
  }

  containsSegment(seg: Segment): Segment | undefined {
    if (seg.point1.equals(seg.point2)) return undefined
    return this.segments.find((segment) => segment.equals(seg))
  }

  returnRandomPoint(): Point {
    const index = Math.floor(Math.random() * this.points.length)
    return this.points[index]
  }
}
