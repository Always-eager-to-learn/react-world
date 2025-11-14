import type { RoughCanvas } from "roughjs/bin/canvas"
import { type CanvasType } from "../../../types/CanvasType"
import type { RoughGenerator } from "roughjs/bin/generator"

export abstract class Shape {
  static canvas: CanvasRenderingContext2D
  static roughCanvas: RoughCanvas
  static roughgenerator: RoughGenerator
  static focusedColor: string = "#A06CD5"
  static withinFocusColor: string = "#6a1818"

  static setContext(ctx: CanvasRenderingContext2D, roughCanvas: RoughCanvas) {
    Shape.canvas = ctx
    Shape.roughCanvas = roughCanvas
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
}
