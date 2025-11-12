import type { IconName } from "lucide-react/dynamic"
import { getCanvasTypes } from "../types/CanvasType"

const icons: { [index: string]: IconName } = {
  lineSquiggle: "line-squiggle",
  eraser: "eraser",
  drawRect: "rectangle-horizontal",
  line: "minus",
  selection: "mouse-pointer-2",
}

const types = getCanvasTypes()

export const canvasButtonInfo = [
  {
    name: "Select Objects",
    iconName: icons.selection,
    type: types.select,
  },
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
