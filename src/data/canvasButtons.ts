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
    name: "Select Objects",
    shortcut: "(S)",
    iconName: icons.selection,
    type: types.select,
    action: "Selecting objects on canvas",
  },
  {
    name: "Draw Rectangle",
    iconName: icons.drawRect,
    shortcut: "(R)",
    type: types.drawRect,
    action: "Drawing rectangle on canvas",
  },
  {
    name: "Draw Line",
    iconName: icons.line,
    shortcut: "(L)",
    type: types.line,
    action: "Drawing line on canvas",
  },
]

export const canvasActionButtonInfo = [
  {
    name: "Redo",
    shortcut: "(Ctrl+Y)",
    iconName: icons.redo,
  },
  {
    name: "Undo",
    shortcut: "(Ctrl+Z)",
    iconName: icons.undo,
  },
  {
    name: "Clear Canvas",
    shortcut: "(Shift+Delete)",
    iconName: icons.clear,
    isClear: true,
  },
]
