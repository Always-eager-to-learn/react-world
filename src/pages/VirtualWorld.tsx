import { useRef, useEffect } from "react"
import Header from "../components/Header"
import { Graph } from "../components/VirtualWorld/math/Graph"
import { Point } from "../components/VirtualWorld/primitives/Point"
import { Segment } from "../components/VirtualWorld/primitives/Segment"

const VirtualWorld = () => {
  const addPoint = () => {
    if (graphElements.current && canvasElement.current) {
      const graph = graphElements.current
      const success = graph.tryAddPoint(
        new Point(
          Math.random() * canvasElement.current.width,
          Math.random() * canvasElement.current.height,
        ),
      )
      console.log(success)
      clearDraw()
    }
  }

  const addRandomSegment = () => {
    if (graphElements.current) {
      const graph = graphElements.current
      const point1 = graph.returnRandomPoint()
      const point2 = graph.returnRandomPoint()
      const result = graph.tryAddSegment(point1, point2)
      console.log(result)
      clearDraw()
    }
  }

  function clearDraw() {
    if (
      canvasContext.current &&
      canvasElement.current &&
      graphElements.current
    ) {
      canvasContext.current.clearRect(
        0,
        0,
        canvasElement.current.width,
        canvasElement.current.height,
      )
      graphElements.current.draw(canvasContext.current)
    }
  }

  const canvasElement = useRef<HTMLCanvasElement>(null)
  const canvasContext = useRef<CanvasRenderingContext2D | null>(null)
  const graphElements = useRef<Graph | null>(null)

  useEffect(() => {
    const canvas = canvasElement.current

    if (canvas === null) return
    canvas.width = 800
    canvas.height = 600
    const context = canvas.getContext("2d")
    canvasContext.current = context
  }, [])

  useEffect(() => {
    const point1 = new Point(200, 200)
    const point2 = new Point(500, 200)
    const point3 = new Point(400, 400)
    const point4 = new Point(700, 550)
    const point5 = new Point(350, 150)

    const seg1 = new Segment(point1, point2)
    const seg2 = new Segment(point3, point5)
    const seg3 = new Segment(point4, point5)
    const seg4 = new Segment(point2, point4)
    if (canvasContext.current) {
      const graph = new Graph(
        [point1, point2, point3, point4, point5],
        [seg1, seg2, seg3, seg4],
      )
      graphElements.current = graph
      clearDraw()
    }
  })

  return (
    <section className="flex flex-col h-dvh">
      <Header text="World-Editor" backButton />
      <main className="grow bg-[#1a3144] flex justify-center">
        <canvas className="bg-[#2a5]" ref={canvasElement}></canvas>
        <section className="fixed right-0 flex flex-col">
          <button className="bg-[#fafafa] text-[#121212]" onClick={addPoint}>
            Add random Point
          </button>
          <button
            className="bg-[#fafafa] text-[#121212]"
            onClick={addRandomSegment}
          >
            Add random Segment
          </button>
        </section>
      </main>
    </section>
  )
}

export default VirtualWorld
