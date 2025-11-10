import { useEffect, useRef, useState } from "react"
import { type CanvasType, getCanvasTypes } from "../../types/CanvasType"
import CanvasSelectorButton from "./CanvasSelectorButtons"
import CanvasAside from "./AsideCanvas"

const MainCanvas = () => {
  function startDrawing(event: React.MouseEvent<HTMLCanvasElement>) {
    const { offsetX, offsetY } = event.nativeEvent
    const element = canvasContext.current
    if (element) {
      element.beginPath()
      element.moveTo(offsetX, offsetY)
      element.lineTo(offsetX, offsetY)
      element.stroke()
      setIsDrawing(true)
      event.nativeEvent.preventDefault()
    }
  }

  function drawing(event: React.MouseEvent<HTMLCanvasElement>) {
    const { offsetX, offsetY } = event.nativeEvent
    const element = canvasContext.current
    if (element && isDrawing) {
      element.lineTo(offsetX, offsetY)
      element.stroke()
    }
  }

  function endDrawing() {
    const element = canvasContext.current
    if (isDrawing && element) {
      element.closePath()
      setIsDrawing(false)
    }
  }

  function setState(newValue: CanvasType) {
    if (canvasContext.current) {
      if (newValue.state === "Erase") {
        canvasContext.current.globalCompositeOperation = "destination-out"
      } else if (newValue.state === "Draw") {
        canvasContext.current.globalCompositeOperation = "source-over"
      }
    }
    setCurrentState(newValue)
  }

  const [isDrawing, setIsDrawing] = useState(false)
  const canvasContext = useRef<CanvasRenderingContext2D | null>(null)
  const canvasElement = useRef<HTMLCanvasElement>(null)
  const containerElement = useRef<HTMLDivElement>(null)
  const types = getCanvasTypes()
  const [currentState, setCurrentState] = useState<CanvasType>(types.draw)

  useEffect(() => {
    const canvas = canvasElement.current
    const container = containerElement.current

    if (canvas === null || container === null) return

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { width, height } = entry.contentRect
        canvas.width = width
        canvas.height = height
        const context = canvas.getContext("2d")
        if (context) {
          context.lineCap = "round"
          context.strokeStyle = "#121212"
          context.lineWidth = 5
        }
      })
    })
    resizeObserver.observe(container)
    // initial size
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight

    const context = canvas.getContext("2d")
    if (context) {
      context.lineCap = "round"
      context.strokeStyle = "#121212"
      context.lineWidth = 5
      canvasContext.current = context
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <main className="grow grid grid-cols-[6fr_1.7fr]">
      <section>
        <div className="h-full w-full relative" ref={containerElement}>
          <canvas
            ref={canvasElement}
            className={`h-full w-full outline-2 outline-[#121212] bg-[#E1E5EE]`}
            onMouseDown={startDrawing}
            onMouseMove={drawing}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
          ></canvas>
          <section className="absolute bottom-4 left-[50%] translate-x-[50%] bg-[#022F40] p-4 rounded-3xl">
            <CanvasSelectorButton
              currentState={currentState}
              stateSetterFunction={setState}
            />
          </section>
        </div>
      </section>
      <CanvasAside canvasContext={canvasContext} />
    </main>
  )
}

export default MainCanvas
