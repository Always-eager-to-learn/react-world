import { canvasActionButtonInfo } from "../../../data/canvasButtons"
import { DynamicIcon } from "lucide-react/dynamic"
import { Shape } from "../Shapes/Shape"

interface Props {
  setElements: (value: React.SetStateAction<Shape[]>) => void
}

const CanvasActionButton = ({ setElements }: Props) => {
  const handleClick = (value: boolean | undefined) => {
    if (value) {
      Shape.clearCanvas(setElements)
    }
  }

  const data = canvasActionButtonInfo
  const elements = data.map((element) => {
    return (
      <section>
        <button
          onClick={() => handleClick(element.isClear)}
          className={`outline-[3px] outline-transparent bg-[#e0e0e0] hover:text-[#e0e0e0] hover:bg-[#112b47] active:scale-95 px-3 py-2 rounded-xl group relative hover:outline-[#e0e0e0] [transition:scale_250ms_ease-out,background-color_350ms_ease-in-out,outline-color_300ms_ease-in-out]`}
        >
          <section
            className={`-z-4 opacity-0 absolute group-hover:opacity-100 -translate-y-2 group-hover:-translate-x-[115%] bg-[#121212] text-[#fafafa] scale-0 group-hover:scale-100 whitespace-nowrap translate-x-0 px-3 py-2.5 rounded-full transition-opacity duration-300 ease-in-out motion-reduce:transition-none motion-reduce:hover:transition-none delay-200`}
          >
            <p>{element.name}</p>
          </section>
          <DynamicIcon name={element.iconName} className="sm:w-8 sm:h-8" />
        </button>
      </section>
    )
  })

  return (
    <section className="absolute right-2 bottom-6 flex flex-col gap-3.5 bg-[#022F40] p-4 rounded-3xl -translate-y-[20%]">
      {elements}
    </section>
  )
}

export default CanvasActionButton
