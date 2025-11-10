import type { IconName } from "lucide-react/dynamic"
import { getCanvasTypes } from "../types/CanvasType"

const icons: { [index: string]: IconName } = {
  pen: "pen",
  eraser: "eraser",
}

const types = getCanvasTypes()

export const canvasButtonInfo = [
  {
    name: "Draw",
    iconName: icons.pen,
    type: types.draw,
  },
  {
    name: "Draw",
    iconName: icons.eraser,
    type: types.erase,
  },
]
