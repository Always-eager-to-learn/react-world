import { useEffect, useRef, useState } from "react"
import {
  type CanvasElements,
  type CanvasType,
  getCanvasTypes,
  type TypeDraw,
} from "../../types/CanvasType"
import CanvasSelectorButton from "./CanvasSelectorButtons"
import CanvasAside from "./AsideCanvas"
import { throttle } from "../../scripts/Throttle"
import rough from "roughjs"
import { RoughGenerator } from "roughjs/bin/generator"
import { RoughCanvas } from "roughjs/bin/canvas"

const MainCanvas = () => {
  const getIntFromString = (value: string | number) => {
    const width =
      typeof value === "string" ? (value === "" ? 5 : parseInt(value)) : value
    return width
  }

  // creating an element
  const createElement = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ): CanvasElements => {
    let roughElement = null
    let type: TypeDraw = "normal"
    const fix = x1
    let six = x2
    const fiy = y1
    let siy = y2
    const elementState = currentState.state

    if (typeOfDraw === "rough") {
      type = "rough"
      if (elementState === "Line") {
        roughElement = roughGenerator.current.line(fix, fiy, six, siy, {
          stroke: canvasColor,
          strokeWidth: getIntFromString(canvasStroke),
        })
      } else if (elementState === "DrawRect") {
        six = six - fix
        siy = siy - fiy
        roughElement = roughGenerator.current.rectangle(fix, fiy, six, siy, {
          stroke: canvasColor,
          strokeWidth: getIntFromString(canvasStroke),
        })
      }
    } else {
      if (elementState === "DrawRect") {
        six = six - fix
        siy = siy - fiy
      }
    }

    return {
      x1: fix,
      y1: fiy,
      x2: six,
      y2: siy,
      element: roughElement,
      type: type,
      state: currentState,
      strokeColor: canvasColor,
      strokeWidth: canvasStroke,
    }
  }

  const startDrawing = throttle(function (
    event: React.MouseEvent<HTMLCanvasElement>,
  ) {
    const { offsetX, offsetY } = event.nativeEvent
    setIsDrawing(true)

    const element = createElement(offsetX, offsetY, offsetX, offsetY)
    if (element) {
      setElements((prev) => [...prev, element])
    }
    event.nativeEvent.preventDefault()
  }, 20)

  const drawing = throttle(function (
    event: React.MouseEvent<HTMLCanvasElement>,
  ) {
    const { offsetX, offsetY } = event.nativeEvent
    if (isDrawing) {
      const index = elements.length - 1
      if (index < 0) return

      const { x1, y1 } = elements[index]
      const updatedElement = createElement(x1, y1, offsetX, offsetY)

      const copyElements = [...elements]
      copyElements[index] = updatedElement
      setElements(copyElements)
    }
  }, 20)

  const endDrawing = throttle(function () {
    if (isDrawing) {
      setIsDrawing(false)
    }
  }, 20)

  function setState(newValue: CanvasType) {
    if (canvasContext.current) {
      if (newValue.state === "Erase") {
        canvasContext.current.globalCompositeOperation = "destination-out"
      }
    }
    setCurrentState(newValue)
  }

  const [isDrawing, setIsDrawing] = useState(false)
  const canvasContext = useRef<CanvasRenderingContext2D | null>(null)
  const roughCanvas = useRef<RoughCanvas | null>(null)
  const canvasElement = useRef<HTMLCanvasElement>(null)
  const containerElement = useRef<HTMLDivElement>(null)
  const types = getCanvasTypes()
  const [currentState, setCurrentState] = useState<CanvasType>(types.line)
  const [typeOfDraw, setTypeOfDraw] = useState<TypeDraw>("normal")
  const [elements, setElements] = useState<CanvasElements[]>([])
  const roughGenerator = useRef<RoughGenerator>(rough.generator())
  const [canvasColor, setCanvasColor] = useState<string>("black")
  const [canvasStroke, setCanvasStroke] = useState<number | string>(
    canvasContext.current?.lineWidth || 5,
  )

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

      // setting contexts
      canvasContext.current = context
      roughCanvas.current = rough.canvas(canvas)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (canvasContext.current && canvasElement.current) {
      canvasContext.current.clearRect(
        0,
        0,
        canvasElement.current.width,
        canvasElement.current.height,
      )
      const canvas = canvasContext.current
      elements.forEach((element) => {
        if (
          element.type === "rough" &&
          element.element &&
          roughCanvas.current
        ) {
          roughCanvas.current.draw(element.element)
        } else if (element.type === "normal" && canvas) {
          const width = getIntFromString(element.strokeWidth)
          canvas.strokeStyle = element.strokeColor
          canvas.lineWidth = width
          if (element.state.state === "Line") {
            canvas.beginPath()
            canvas.moveTo(element.x1, element.y1)
            canvas.lineTo(element.x1, element.y1)
            canvas.lineTo(element.x2, element.y2)
            canvas.closePath()
          } else if (element.state.state === "DrawRect") {
            canvas.rect(element.x1, element.y1, element.x2, element.y2)
          }
          canvas.stroke()
        }
      })
    }
  }, [elements])

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
          <section className="absolute bottom-4 left-[40%] translate-x-[50%] bg-[#022F40] p-4 rounded-3xl">
            <CanvasSelectorButton
              currentState={currentState}
              stateSetterFunction={setState}
            />
          </section>
        </div>
      </section>
      <CanvasAside
        canvasContext={canvasContext}
        canvasElement={canvasElement}
        typeOfDrawing={typeOfDraw}
        setTypeOfDrawing={setTypeOfDraw}
        setElementsOnPage={setElements}
        canvasStroke={canvasColor}
        setCanvasStroke={setCanvasColor}
        canvasStrokeWidth={canvasStroke}
        setCanvasStrokeWidth={setCanvasStroke}
      />
    </main>
  )
}

export default MainCanvas
