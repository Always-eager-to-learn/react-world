import type { Drawable } from "roughjs/bin/core"
import type { CanvasType, TypeDraw } from "../../../types/CanvasType"
import { Shape } from "./Shape"
import { getIntFromString } from "../../../scripts/Number"

export class Rectangle extends Shape {
  index: number
  x1: number
  y1: number
  width: number
  height: number
  type: TypeDraw
  strokeColor: string
  strokeWidth: number | string
  selection: {
    offsetX: number
    offsetY: number
  }
  element: null | Drawable
  elementState: CanvasType
  focusedState: boolean

  constructor(
    x1: number,
    y1: number,
    width: number,
    height: number,
    type: TypeDraw,
    strokeColor: string,
    strokeWidth: number | string,
    index: number,
  ) {
    super()
    this.x1 = x1
    this.y1 = y1
    this.width = width - x1
    this.height = height - y1
    this.type = type
    this.strokeColor = strokeColor
    this.strokeWidth = strokeWidth
    this.index = index
    this.selection = {
      offsetX: 0,
      offsetY: 0,
    }
    this.element = null
    this.elementState = { state: "DrawRect" }
    this.focusedState = false
  }

  private createDrawable(): void {
    if (Shape.roughgenerator) {
      const color = this.focusedState ? Shape.focusedColor : this.strokeColor
      console.log(color)
      this.element = Shape.roughgenerator.rectangle(
        this.x1,
        this.y1,
        this.width,
        this.height,
        {
          stroke: color,
          strokeWidth: getIntFromString(this.strokeWidth),
        },
      )
    }
  }

  createElement(): void {
    if (this.elementState.state === "DrawRect" && this.type == "rough") {
      this.createDrawable()
    }
  }

  updateElement(clientX: number, clientY: number, type: CanvasType): void {
    switch (type.state) {
      case "Selection": {
        const newx1 = clientX - this.selection.offsetX
        const newy1 = clientY - this.selection.offsetY
        this.x1 += newx1
        this.y1 += newy1
        this.setOffset(clientX, clientY)
        if (this.type === "rough") {
          this.createDrawable()
        }
        break
      }
      case "DrawRect": {
        this.width = clientX - this.x1
        this.height = clientY - this.y1
        if (this.type === "rough") {
          this.createDrawable()
        }
      }
    }
  }

  draw(): void {
    const canvas = Shape.canvas
    const roughCanvas = Shape.roughCanvas
    switch (this.type) {
      case "rough": {
        if (roughCanvas && this.element) {
          roughCanvas.draw(this.element)
        }
        break
      }
      case "normal": {
        if (canvas) {
          const width = getIntFromString(this.strokeWidth)
          canvas.strokeStyle = this.focusedState
            ? Shape.focusedColor
            : this.strokeColor
          canvas.lineWidth = width
          canvas.beginPath()
          canvas.rect(this.x1, this.y1, this.width, this.height)
          canvas.closePath()
          canvas.stroke()
        }
        break
      }
    }
  }

  focusedElement(): void {
    if (this.strokeColor !== Shape.focusedColor) {
      this.focusedState = true
      this.createDrawable()
    }
  }

  revertFocus(): void {
    this.focusedState = false
    this.createDrawable()
  }

  elementWithinRange(clientX: number, clientY: number): boolean {
    const minX = Math.min(this.x1, this.x1 + this.width)
    const maxX = Math.max(this.x1, this.x1 + this.width)
    const minY = Math.min(this.y1, this.y1 + this.height)
    const maxY = Math.max(this.y1, this.y1 + this.height)
    return (
      clientX >= minX && clientX <= maxX && clientY >= minY && clientY <= maxY
    )
  }

  setOffset(clientX: number, clientY: number): void {
    this.selection = {
      offsetX: clientX,
      offsetY: clientY,
    }
  }

  getIndex(): number {
    return this.index
  }
}
