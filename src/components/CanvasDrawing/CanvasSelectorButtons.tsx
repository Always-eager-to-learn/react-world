import type { JSX } from "react"
import type { CanvasType } from "../../types/CanvasType"
import { canvasButtonInfo } from "../../data/canvasButtons"
import { DynamicIcon } from "lucide-react/dynamic"

interface Props {
  currentState: CanvasType
  stateSetterFunction: (value: CanvasType) => void
}

const CanvasSelectorButton = ({ currentState, stateSetterFunction }: Props) => {
  const buttonInfo = canvasButtonInfo
  const jsxElement: JSX.Element[] = buttonInfo.map((element) => (
    <button
      onClick={() => stateSetterFunction(element.type)}
      className={`outline-2  ${currentState.state === element.type.state ? "bg-[#FFEECF] text-[#002F7A] hover:text-[#ffeecf] hover:bg-[#002f7a] outline-[#59D2FE]" : "bg-[#F7F052] text-[#112B47] hover:text-[#f7f052] hover:bg-[#112b47] outline-transparent active:scale-90"} px-3 py-2 rounded-xl`}
    >
      <DynamicIcon name={element.iconName} className="sm:w-8 sm:h-8" />
    </button>
  ))

  return <section className="flex gap-3.5">{jsxElement}</section>
}

export default CanvasSelectorButton
