import type { IconName } from "lucide-react/dynamic"
import { getCanvasTypes } from "../types/CanvasType"

const icons: { [index: string]: IconName } = {
  lineSquiggle: "line-squiggle",
  eraser: "eraser",
  drawRect: "rectangle-horizontal",
  line: "minus",
  selection: "mouse-pointer-2",
  redo: "redo",
  undo: "undo",
  clear: "circle-x",
}

const types = getCanvasTypes()

export const canvasButtonInfo = [
  {
    name: "Select Objects (S)",
    iconName: icons.selection,
    type: types.select,
  },
  {
    name: "Draw Rectangle (R)",
    iconName: icons.drawRect,
    type: types.drawRect,
  },
  {
    name: "Draw Line",
    iconName: icons.line,
    type: types.line,
  },
]

export const canvasActionButtonInfo = [
  {
    name: "Redo (Ctrl+Y)",
    iconName: icons.redo,
  },
  {
    name: "Undo (Ctrl+Z)",
    iconName: icons.undo,
  },
  {
    name: "Clear Canvas (Ctrl+Shift+Del)",
    iconName: icons.clear,
    isClear: true,
  },
]
