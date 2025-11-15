import type { ColorType } from "../types/CanvasType"

type color = Record<ColorType, { name: string; min: number; max: number }[]>

const inputs: color = {
  rgb: [
    {
      name: "R",
      min: 0,
      max: 255,
    },
    {
      name: "G",
      min: 0,
      max: 255,
    },
    {
      name: "B",
      min: 0,
      max: 255,
    },
  ],
  hsl: [],
  hsv: [],
  hex: [],
}

export const getColorInput = (val: ColorType) => {
  const input = inputs[val]
  return input
}
