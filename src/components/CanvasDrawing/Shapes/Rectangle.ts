import type { Drawable } from "roughjs/bin/core"
import type {
  CanvasType,
  MouseLocation,
  TypeDraw,
} from "../../../types/CanvasType"
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
  hoveredFocusState: boolean
  hoveredFocusSet: boolean
  selected: boolean
  mouseLocation: MouseLocation
  t1: MouseLocation
  t2: MouseLocation
  t3: MouseLocation
  t4: MouseLocation
  inside: MouseLocation

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
    this.hoveredFocusState = false
    this.hoveredFocusSet = false
    this.mouseLocation = null
    this.t1 = "tl"
    this.t2 = "tr"
    this.t3 = "bl"
    this.t4 = "br"
    this.inside = "inside"
    this.selected = false
  }

  private createDrawable(): void {
    if (Shape.roughgenerator) {
      const color = this.getCurrentColor()
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

  getCurrentColor(): string {
    const color = this.focusedState
      ? Shape.focusedColor
      : this.hoveredFocusState
        ? Shape.withinFocusColor
        : this.selected
          ? Shape.selectedColor
          : this.strokeColor
    return color
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
          canvas.strokeStyle = this.getCurrentColor()
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
    const condition =
      clientX >= minX && clientX <= maxX && clientY >= minY && clientY <= maxY
    if (condition && this.mouseLocation === null) {
      this.mouseLocation = this.inside
    }
    if (!condition && this.hoveredFocusState) {
      this.hoveredFocusState = false
      this.createDrawable()
    }
    return condition
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
    options: { offset: number } = { offset: 8 },
  ): void {
    const t1 = this.pointFinder(
      mousex,
      mousey,
      this.x1,
      this.y1,
      options.offset,
    )
      ? this.t1
      : null
    const t2 = this.pointFinder(
      mousex,
      mousey,
      this.x1 + this.width,
      this.y1,
      options.offset,
    )
      ? this.t2
      : null
    const t3 = this.pointFinder(
      mousex,
      mousey,
      this.x1,
      this.y1 + this.height,
      options.offset,
    )
      ? this.t3
      : null
    const t4 = this.pointFinder(
      mousex,
      mousey,
      this.x1 + this.width,
      this.y1 + this.height,
      options.offset,
    )
      ? this.t4
      : null

    this.mouseLocation = t1 || t2 || t3 || t4 || this.inside
  }

  setNewCoordinates(mousex: number, mousey: number): void {
    const xdiff = mousex - this.x1
    const ydiff = mousey - this.y1
    switch (this.mouseLocation) {
      case "tl": {
        let width = 0
        let height = 0
        if (mousex > this.x1 && mousey > this.y1) {
          width = this.width - xdiff
          height = this.height - ydiff
        } else if (mousex > this.x1) {
          width = this.width - xdiff
          height = this.height + Math.abs(ydiff)
        } else if (mousey > this.y1) {
          width = this.width + Math.abs(xdiff)
          height = this.height - ydiff
        } else {
          width = this.width + Math.abs(xdiff)
          height = this.height + Math.abs(ydiff)
        }
        this.x1 = mousex
        this.y1 = mousey
        this.width = width
        this.height = height
        break
      }
      case "tr": {
        const width = xdiff
        let height = 0
        if (mousey > this.y1) {
          height = this.height - ydiff
        } else {
          height = this.height + Math.abs(ydiff)
        }
        this.y1 = mousey
        this.width = width
        this.height = height
        break
      }

      case "bl": {
        const height = ydiff
        let width = 0
        if (mousex > this.x1) {
          width = this.width - xdiff
        } else {
          width = this.width + Math.abs(xdiff)
        }
        this.x1 = mousex
        this.width = width
        this.height = height
        break
      }

      case "br": {
        const width = mousex - (this.x1 + this.width)
        const height = mousey - (this.y1 + this.height)
        this.width += width
        this.height += height
      }
    }
    this.createDrawable()
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

  setSelected(): void {
    if (!this.selected) {
      this.selected = true
      this.hoveredFocusState = false
      this.createDrawable()
    }
  }

  revertSelected(): void {
    if (this.selected) {
      this.selected = false
      this.createDrawable()
    }
  }

  getSelectedStatus(): boolean {
    return this.selected
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

  getPosition(): MouseLocation {
    return this.mouseLocation
  }
}
