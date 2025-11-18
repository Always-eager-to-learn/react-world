import { useCallback, useEffect, useRef, useState } from "react"
import {
  type CanvasType,
  getCanvasTypes,
  type TypeDraw,
  type WarningCanvas,
  type CanvasAction,
} from "../../types/CanvasType"
import CanvasSelectorButton from "./CanvasInput/CanvasSelectorButtons"
import CanvasWarning from "./CanvasWarning"
import CanvasAside from "./AsideCanvas"
import { throttle } from "../../scripts/Throttle"
import rough from "roughjs"
import { Rectangle } from "./Shapes/Rectangle"
import { Line } from "./Shapes/Line"
import { Shape } from "./Shapes/Shape"
import CanvasActionButton from "./CanvasInput/CanvasActionButtons"

const MainCanvas = () => {
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
        Shape.addShape(rectangle, setElements)
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
        Shape.addShape(line, setElements)
        break
      }
      case "Selection": {
        if (hoveredElement.current !== null) {
          hoveredElement.current.setOffset(clientX, clientY)
          hoveredElement.current.focusedElement()
          hoveredElement.current.setSelected()
          if (hoveredElement.current.getPosition() === "inside") {
            setAction("selection")
          } else {
            setAction("resize")
          }
          if (
            selectedElements?.getSelectedStatus() &&
            selectedElements &&
            selectedElements !== hoveredElement.current
          ) {
            selectedElements.revertSelected()
          }
          setSelectedElements(hoveredElement.current)
        } else if (hoveredElement.current === null) {
          if (selectedElements) {
            selectedElements.revertSelected()
            setSelectedElements(null)
            Shape.drawElements(elements)
          }
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

      Shape.setUpdateElement(
        elements,
        clientX,
        clientY,
        index,
        currentState,
        setElements,
      )
    } else if (action === "selection") {
      if (selectedElements) {
        const index = selectedElements.getIndex()
        Shape.setUpdateElement(
          elements,
          clientX,
          clientY,
          index,
          currentState,
          setElements,
        )
        Shape.setCursor(event, { element: selectedElements })
      }
    } else if (action === "resize") {
      if (selectedElements) {
        selectedElements.setNewCoordinates(clientX, clientY)
        Shape.drawElements(elements)
        Shape.setCursor(event, { element: selectedElements })
      }
    } else if (currentState.state === "Selection") {
      const positionElements = Shape.getElementAtPosition(
        clientX,
        clientY,
        elements,
      )
      if (positionElements.length > 0) {
        prevLength.current = positionElements.length
        const selectedElement = positionElements.pop()
        Shape.revertHoveredFocusFromElements(positionElements)
        if (selectedElement) {
          selectedElement.findNearPoint(clientX, clientY)
          hoveredElement.current = selectedElement
          if (selectedElement !== selectedElements) {
            selectedElement.hoveredFocus()
          } else {
            Shape.setCursor(event, { element: selectedElements })
          }
        }
        Shape.drawElements(elements)
      } else if (prevLength.current > positionElements.length) {
        prevLength.current = 0
        hoveredElement.current = null
        Shape.drawElements(elements)
        Shape.setCursor(event)
      }
    } else {
      Shape.revertHoveredFocusFromElements(elements)
      Shape.drawElements(elements)
    }
  }, 20)

  const endDrawing = throttle(function (
    event: React.MouseEvent<HTMLCanvasElement>,
  ) {
    if (action !== "none") {
      if (currentState.state !== "Selection") {
        setAction("none")
      } else {
        setAction("display")
      }
      if (selectedElements) {
        event.currentTarget.style.cursor = "default"
        selectedElements.revertFocus()
        Shape.drawElements(elements)
      }
    } else if (currentState.state === "Selection") {
      Shape.revertHoveredFocusFromElements(elements)
      Shape.drawElements(elements)
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
  const hoveredElement = useRef<Shape | null>(null)
  const prevLength = useRef(0)
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

  const selectOption = useCallback(
    (event: KeyboardEvent) => {
      if (event.shiftKey && event.code === "Delete") {
        Shape.clearCanvas(setElements)
      } else {
        switch (event.code) {
          case "KeyR": {
            setCurrentState(types.drawRect)
            break
          }
          case "KeyS": {
            setCurrentState(types.select)
            break
          }
          case "KeyL": {
            setCurrentState(types.line)
          }
        }
      }
    },
    [types.drawRect, types.select],
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
    const width = container.clientWidth
    const height = container.clientHeight
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext("2d")
    if (context) {
      context.lineCap = "round"
      context.strokeStyle = "#121212"
      context.lineWidth = 5

      // setting contexts
      canvasContext.current = context
      Shape.setContext(context, rough.canvas(canvas), canvas, rough.generator())
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    Shape.drawElements(elements)
  }, [elements])

  useEffect(() => {
    document.addEventListener("keydown", selectOption)

    return () => {
      document.removeEventListener("keydown", selectOption)
    }
  }, [selectOption])

  return (
    <main className="grow grid grid-cols-[6fr_1.7fr] overflow-hidden">
      <section>
        <div className="h-full w-full relative" ref={containerElement}>
          <canvas
            tabIndex={0}
            ref={canvasElement}
            className={`h-full w-full outline-2 outline-[#121212] bg-[#E1E5EE]`}
            onMouseDown={startDrawing}
            onMouseMove={drawing}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
          ></canvas>
          <CanvasSelectorButton
            currentState={currentState}
            stateSetterFunction={setState}
          />
          <CanvasActionButton setElements={setElements} />
        </div>
      </section>
      <CanvasAside
        canvasContext={canvasContext}
        typeOfDrawing={typeOfDraw}
        setTypeOfDrawing={setTypeOfDraw}
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
