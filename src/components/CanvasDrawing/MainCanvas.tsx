import { useEffect, useRef, useState } from "react"
import {
  type CanvasType,
  getCanvasTypes,
  type TypeDraw,
  type WarningCanvas,
  type CanvasAction,
} from "../../types/CanvasType"
import CanvasSelectorButton from "./CanvasSelectorButtons"
import CanvasWarning from "./CanvasWarning"
import CanvasAside from "./AsideCanvas"
import { throttle } from "../../scripts/Throttle"
import rough from "roughjs"
import { Rectangle } from "./Shapes/Rectangle"
import { Line } from "./Shapes/Line"
import { Shape } from "./Shapes/Shape"

const MainCanvas = () => {
  const getElementAtPosition = (pos1: number, pos2: number) => {
    return elements.filter((element) => element.elementWithinRange(pos1, pos2))
  }

  const setUpdateElement = (
    element: Shape,
    clientX: number,
    clientY: number,
    index: number,
  ) => {
    element.updateElement(clientX, clientY, currentState)
    updateElementState(element, index)
  }

  const updateElementState = (element: Shape, index: number) => {
    const copyElements = [...elements]
    copyElements[index] = element
    setElements(copyElements)
  }

  const addToElements = (shape: Shape) => {
    shape.createElement()
    setElements((prev) => [...prev, shape])
  }

  const startDrawing = throttle(function (
    event: React.MouseEvent<HTMLCanvasElement>,
  ) {
    const { clientX, clientY } = event.nativeEvent
    const id = elements.length
    switch (currentState.state) {
      case "DrawRect": {
        setAction("draw")
        const rectangle = new Rectangle(
          clientX,
          clientY,
          clientX,
          clientY,
          typeOfDraw,
          canvasColor,
          canvasStroke,
          id,
        )
        addToElements(rectangle)
        break
      }
      case "Line": {
        setAction("draw")
        const line = new Line(
          clientX,
          clientY,
          clientX,
          clientY,
          typeOfDraw,
          canvasColor,
          canvasStroke,
          id,
        )
        addToElements(line)
        break
      }
      case "Selection": {
        const element = getElementAtPosition(clientX, clientY)
        const selectedElement = element.pop()
        if (selectedElement) {
          selectedElement.setOffset(clientX, clientY)
          setAction("selection")
          setSelectedElements(selectedElement)
        }
        break
      }
    }
    event.nativeEvent.preventDefault()
  }, 20)

  const drawing = throttle(function (
    event: React.MouseEvent<HTMLCanvasElement>,
  ) {
    const { clientX, clientY } = event.nativeEvent
    if (action === "draw") {
      const index = elements.length - 1
      if (index < 0) return

      const element = elements[index]
      setUpdateElement(element, clientX, clientY, index)
    } else if (action === "selection") {
      if (selectedElements) {
        const index = selectedElements.getIndex()
        const element = elements[index]
        setUpdateElement(element, clientX, clientY, index)
        event.currentTarget.style.cursor = "move"
      }
    }
  }, 20)

  const endDrawing = throttle(function (
    event: React.MouseEvent<HTMLCanvasElement>,
  ) {
    if (action !== "none") {
      setAction("none")
      if (selectedElements) {
        event.currentTarget.style.cursor = "default"
      }
      setSelectedElements(null)
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

  function setStrokeValue(val?: number) {
    if (val) {
      setCanvasStroke(val)
    }
    setWarningMounted(false)
  }

  const [action, setAction] = useState<CanvasAction>("draw")
  const canvasContext = useRef<CanvasRenderingContext2D | null>(null)
  const canvasElement = useRef<HTMLCanvasElement>(null)
  const containerElement = useRef<HTMLDivElement>(null)
  const types = getCanvasTypes()
  const [currentState, setCurrentState] = useState<CanvasType>(types.line)
  const [typeOfDraw, setTypeOfDraw] = useState<TypeDraw>("normal")
  const [elements, setElements] = useState<Shape[]>([])
  const [selectedElements, setSelectedElements] = useState<Shape | null>(null)
  const [canvasColor, setCanvasColor] = useState<string>("#111")
  const [canvasStroke, setCanvasStroke] = useState<number | string>(
    canvasContext.current?.lineWidth || 5,
  )
  const [warning, setWarning] = useState<WarningCanvas>({
    showWarning: false,
    warningMessage: "",
    warningType: { type: null },
  })
  const [warningMounted, setWarningMounted] = useState(false)
  const messages = warning.warningMessage.split(".")
  const jsxElements = messages.map((element) => (
    <p className="max-sm:text-base sm:text-lg">{element}</p>
  ))

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
      Shape.canvas = context
      Shape.roughCanvas = rough.canvas(canvas)
      Shape.roughgenerator = rough.generator()
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
        canvasElement.current.clientWidth,
        canvasElement.current.clientHeight,
      )
      if (elements.length > 0) {
        elements.forEach((element) => {
          element.draw()
        })
      }
    }
  }, [elements])

  return (
    <main className="grow grid grid-cols-[6fr_1.7fr] overflow-hidden">
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
          <section className="fixed bottom-4 left-[30%] translate-x-[50%] bg-[#022F40] p-4 rounded-3xl">
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
        warning={warning}
        setWarning={setWarning}
        setWarningMounted={setWarningMounted}
      />
      <CanvasWarning
        warning={warning}
        setWarning={setWarning}
        isMounted={warningMounted}
        setIsMounted={setWarningMounted}
        delayTime={40}
        sliderColor="bg-[#3B429F]"
      >
        {warning.showWarning ? (
          <>
            <section className="px-4 py-2">{jsxElements}</section>
            <section className="flex gap-3.5 justify-evenly px-4 py-2">
              <button
                className="py-3 px-3.5 rounded-2xl outline-2 outline-transparent font-medium sm:text-lg max-sm:text-base bg-[#fafefb] text-[#2B2D42] [transition:outline-color_350ms_ease-in-out,scale_250ms_ease-out,translate_300ms_ease-in-out] hover:translate-y-1 active:scale-90 hover:outline-[#083D77]"
                onClick={() => setStrokeValue(100)}
              >
                Default to 100
              </button>
              <button
                className="py-3 px-3.5 rounded-2xl outline-2 outline-transparent font-medium sm:text-lg max-sm:text-base bg-[#FAFEFB] text-[#940110] [transition:outline-color_350ms_ease-in-out,scale_250ms_ease-out] active:scale-95 hover:outline-[#083D77]"
                onClick={() => setStrokeValue()}
              >
                Set {canvasStroke}
              </button>
            </section>
          </>
        ) : null}
      </CanvasWarning>
    </main>
  )
}

export default MainCanvas
