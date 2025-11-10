export interface CanvasType {
  state: "Draw" | "Erase"
}

export function getCanvasTypes(): { [index: string]: CanvasType } {
  return {
    draw: { state: "Draw" },
    erase: { state: "Erase" },
  }
}
