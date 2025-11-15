import type { RoughCanvas } from "roughjs/bin/canvas"
import { type CanvasType } from "../../../types/CanvasType"
import type { RoughGenerator } from "roughjs/bin/generator"

export abstract class Shape {
  static canvas: CanvasRenderingContext2D
  static canvasElement: HTMLCanvasElement
  static roughCanvas: RoughCanvas
  static roughgenerator: RoughGenerator
  static focusedColor: string = "#F79D5C"
  static withinFocusColor: string = "#9fb3d4"

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

  static drawElements(elements: Shape[]) {
    if (Shape.canvas && Shape.canvasElement) {
      Shape.canvas.clearRect(
        0,
        0,
        Shape.canvasElement.clientWidth,
        Shape.canvasElement.clientHeight,
      )
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
}
