import type { Graph } from "./math/Graph"
import { Point } from "./primitives/Point"

export class GraphEditor {
  canvas: HTMLCanvasElement
  graph: Graph
  context: CanvasRenderingContext2D | null

  constructor(canvas: HTMLCanvasElement, graph: Graph) {
    this.canvas = canvas
    this.graph = graph
    this.context = canvas.getContext("2d")
    this.addEventListeners()
  }

  private addEventListeners() {
    this.canvas.addEventListener("mousedown", (event: MouseEvent) => {
      console.log("Clinet", event.clientX, event.clientY)
      console.log("offset", event.offsetX, event.offsetY)
      const mouse = new Point(event.offsetX, event.offsetY)
      this.graph.tryAddPoint(mouse)
    })
  }

  display() {
    if (this.context) {
      this.graph.draw(this.context)
    }
  }
}
