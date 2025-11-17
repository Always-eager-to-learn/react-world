import type { RoughCanvas } from "roughjs/bin/canvas"
import type {
  CanvasType,
  MouseLocation,
  SetCursorOptions,
} from "../../../types/CanvasType"
import type { RoughGenerator } from "roughjs/bin/generator"

export abstract class Shape {
  static canvas: CanvasRenderingContext2D
  static canvasElement: HTMLCanvasElement
  static roughCanvas: RoughCanvas
  static roughgenerator: RoughGenerator
  static focusedColor: string = "#d2466b"
  static withinFocusColor: string = "#4382cb"
  static selectedColor: string = "#2ecc71"

  static setContext(
    ctx: CanvasRenderingContext2D,
    roughCanvas: RoughCanvas,
    canvasElement: HTMLCanvasElement,
    generator: RoughGenerator,
  ) {
    Shape.canvas = ctx
    Shape.roughCanvas = roughCanvas
    Shape.canvasElement = canvasElement
    Shape.roughgenerator = generator
  }

  static clearCanvas(
    setElements?: (value: React.SetStateAction<Shape[]>) => void,
  ) {
    if (Shape.canvas && Shape.canvasElement) {
      Shape.canvas.clearRect(
        0,
        0,
        Shape.canvasElement.clientWidth,
        Shape.canvasElement.clientHeight,
      )
      if (setElements !== undefined) {
        setElements([])
      }
    }
  }

  static drawElements(elements: Shape[]) {
    if (Shape.canvas && Shape.canvasElement) {
      Shape.clearCanvas()
      if (elements.length > 0) {
        elements.forEach((element) => {
          element.draw()
        })
      }
    }
  }

  static addShape(
    shape: Shape,
    setElements: (value: React.SetStateAction<Shape[]>) => void,
  ) {
    shape.createElement()
    setElements((prev) => [...prev, shape])
  }

  static setUpdateElement(
    elements: Shape[],
    clientX: number,
    clientY: number,
    index: number,
    currentState: CanvasType,
    setElements: (value: React.SetStateAction<Shape[]>) => void,
  ) {
    const element = elements[index]
    element.updateElement(clientX, clientY, currentState)
    const prevElements = [...elements]
    prevElements[index] = element
    setElements(prevElements)
  }

  static revertHoveredFocusFromElements(elements: Shape[]) {
    elements.forEach((element) => {
      if (element.getHoveredFocus()) {
        element.revertHoveredFocus()
      }
    })
  }

  static getElementAtPosition(
    pos1: number,
    pos2: number,
    elements: Shape[],
  ): Shape[] {
    return elements.filter((element) => element.elementWithinRange(pos1, pos2))
  }

  static cursorAtPosition(value: MouseLocation): string {
    let mouseStyle = ""
    switch (value) {
      case "bl":
      case "tr": {
        mouseStyle = "nesw-resize"
        break
      }
      case "br":
      case "tl": {
        mouseStyle = "nwse-resize"
        break
      }
      case "start": {
        mouseStyle = "e-resize"
        break
      }
      case "end": {
        mouseStyle = "w-resize"
        break
      }
      case "inside": {
        mouseStyle = "move"
        break
      }
    }
    return mouseStyle
  }

  static setCursor(
    event: React.MouseEvent<HTMLCanvasElement>,
    options: SetCursorOptions = {},
  ): void {
    if (options.element) {
      event.currentTarget.style.cursor = Shape.cursorAtPosition(
        options.element.getPosition(),
      )
    } else {
      event.currentTarget.style.cursor = options.value || "default"
    }
  }

  abstract createElement(): void
  abstract updateElement(
    clientX: number,
    clientY: number,
    type: CanvasType,
  ): void
  abstract draw(): void
  abstract elementWithinRange(clientX: number, clientY: number): boolean
  abstract setOffset(clientX: number, clientY: number): void
  abstract getIndex(): number
  abstract focusedElement(): void
  abstract revertFocus(): void
  abstract hoveredFocus(): void
  abstract getHoveredFocus(): boolean
  abstract revertHoveredFocus(): void
  abstract findNearPoint(
    mousex: number,
    mousey: number,
    options?: { offset: number },
  ): void
  abstract pointFinder(
    mousex: number,
    mousey: number,
    x: number,
    y: number,
    offset: number,
  ): boolean
  abstract getPosition(): MouseLocation
  abstract setNewCoordinates(mousex: number, mousey: number): void
  abstract setSelected(): void
  abstract revertSelected(): void
  abstract getSelectedStatus(): boolean
  abstract getCurrentColor(): string
}
