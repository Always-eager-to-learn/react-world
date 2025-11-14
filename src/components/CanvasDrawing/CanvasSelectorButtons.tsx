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
      className={`outline-4 bg-[#e0e0e0] hover:text-[#e0e0e0] hover:bg-[#112b47] ${currentState.state === element.type.state ? "text-[#002F7A] outline-[#59D2FE]" : "outline-transparent active:scale-90"} px-3 py-2 rounded-xl group relative [transition:scale_250ms_ease-out,background-color_350ms_ease-in-out,outline-color_350ms_ease-in-out]`}
    >
      <section
        className={`-z-4 opacity-0 absolute group-hover:opacity-100 translate-y-0 group-hover:-translate-y-[170%] bg-[#121212] text-[#fafafa] scale-0 group-hover:scale-100 whitespace-nowrap -translate-x-[30%] px-3 py-2.5 rounded-full transition-opacity duration-300 ease-in-out motion-reduce:transition-none motion-reduce:hover:transition-none delay-200`}
      >
        <p>{element.name}</p>
      </section>
      <DynamicIcon name={element.iconName} className="sm:w-8 sm:h-8" />
    </button>
  ))

  return <section className="flex gap-3.5">{jsxElement}</section>
}

export default CanvasSelectorButton
