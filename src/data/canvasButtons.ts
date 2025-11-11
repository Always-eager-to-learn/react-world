import type { IconName } from "lucide-react/dynamic"
import { getCanvasTypes } from "../types/CanvasType"

const icons: { [index: string]: IconName } = {
  lineSquiggle: "line-squiggle",
  eraser: "eraser",
  drawRect: "rectangle-horizontal",
  line: "minus",
}

const types = getCanvasTypes()

export const canvasButtonInfo = [
  {
    name: "Draw Rectangle",
    iconName: icons.drawRect,
    type: types.drawRect,
  },
  {
    name: "Draw Line",
    iconName: icons.line,
    type: types.line,
  },
]
