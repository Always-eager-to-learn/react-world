import type { Drawable } from "roughjs/bin/core"
import type {
  CanvasType,
  MouseLocation,
  TypeDraw,
} from "../../../types/CanvasType"
import { Shape } from "./Shape"
import { getIntFromString } from "../../../scripts/Number"
import { type LinePoint } from "../../../types/CanvasType"

export class Line extends Shape {
  index: number
  x1: number
  y1: number
  x2: number
  y2: number
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
  hoveredFocusState: boolean
  hoveredFocusSet: boolean
  mouseLocation: MouseLocation
  start: MouseLocation
  end: MouseLocation
  inside: MouseLocation

  constructor(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    type: TypeDraw,
    strokeColor: string,
    strokeWidth: number | string,
    index: number,
  ) {
    super()
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
    this.type = type
    this.strokeColor = strokeColor
    this.strokeWidth = strokeWidth
    this.index = index
    this.selection = {
      offsetX: 0,
      offsetY: 0,
    }
    this.element = null
    this.elementState = { state: "Line" }
    this.focusedState = false
    this.hoveredFocusState = false
    this.hoveredFocusSet = false
    this.mouseLocation = null
    this.start = "start"
    this.end = "end"
    this.inside = "inside"
  }

  private createDrawable(): void {
    if (Shape.roughgenerator) {
      const color = this.focusedState
        ? Shape.focusedColor
        : this.hoveredFocusState
          ? Shape.withinFocusColor
          : this.strokeColor
      this.element = Shape.roughgenerator.line(
        this.x1,
        this.y1,
        this.x2,
        this.y2,
        {
          stroke: color,
          strokeWidth: getIntFromString(this.strokeWidth),
        },
      )
    }
  }

  createElement(): void {
    if (this.elementState.state === "Line" && this.type == "rough") {
      this.createDrawable()
    }
  }

  updateElement(clientX: number, clientY: number, type: CanvasType): void {
    switch (type.state) {
      case "Selection": {
        const xo = clientX - this.selection.offsetX
        const yo = clientY - this.selection.offsetY
        this.x1 += xo
        this.y1 += yo
        this.x2 += xo
        this.y2 += yo
        this.setOffset(clientX, clientY)
        if (this.type === "rough") {
          this.createDrawable()
        }
        break
      }
      case "Line": {
        this.x2 = clientX
        this.y2 = clientY
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
            : this.hoveredFocusState
              ? Shape.withinFocusColor
              : this.strokeColor
          canvas.lineWidth = width
          canvas.beginPath()
          canvas.moveTo(this.x1, this.y1)
          canvas.lineTo(this.x1, this.y1)
          canvas.lineTo(this.x2, this.y2)
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

  hoveredFocus(): void {
    if (!this.hoveredFocusState) {
      this.hoveredFocusState = true
      this.createDrawable()
    }
  }

  getHoveredFocus(): boolean {
    return this.hoveredFocusState
  }

  revertHoveredFocus(): void {
    this.hoveredFocusState = false
    this.createDrawable()
  }

  revertFocus(): void {
    this.focusedState = false
    this.createDrawable()
  }

  elementWithinRange(clientX: number, clientY: number): boolean {
    const a: LinePoint = { x: this.x1, y: this.y1 }
    const b: LinePoint = { x: this.x2, y: this.y2 }
    const c: LinePoint = { x: clientX, y: clientY }
    const offset =
      this.distance(a, b) - (this.distance(a, c) + this.distance(b, c))
    const condition = Math.abs(offset) < 1
    if (condition && this.mouseLocation === null) {
      this.mouseLocation = this.inside
    }
    if (!condition && this.hoveredFocusState) {
      this.hoveredFocusState = false
      this.createDrawable()
    }
    return Math.abs(offset) < 1
  }

  private distance(a: LinePoint, b: LinePoint) {
    const value = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
    return value
  }

  setOffset(clientX: number, clientY: number): void {
    this.selection = {
      offsetX: clientX,
      offsetY: clientY,
    }
  }

  pointFinder(
    mousex: number,
    mousey: number,
    x: number,
    y: number,
    offset: number,
  ): boolean {
    return Math.abs(mousex - x) < offset && Math.abs(mousey - y) < offset
  }

  findNearPoint(
    mousex: number,
    mousey: number,
    options: { offset: number } = { offset: 7 },
  ): void {
    const t1 = this.pointFinder(
      mousex,
      mousey,
      this.x1,
      this.y1,
      options.offset,
    )
      ? this.start
      : null
    const t2 = this.pointFinder(
      mousex,
      mousey,
      this.x2,
      this.y2,
      options.offset,
    )
      ? this.end
      : null

    this.mouseLocation = t1 || t2 || this.inside
  }

  setNewCoordinates(mousex: number, mousey: number): void {
    switch (this.mouseLocation) {
      case "start": {
        this.x1 = mousex
        this.y1 = mousey
        break
      }
      case "end": {
        this.x2 = mousex
        this.y2 = mousey
      }
    }
    this.createDrawable()
  }

  getIndex(): number {
    return this.index
  }

  getPosition(): MouseLocation {
    return this.mouseLocation
  }
}
