import { ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"
import HeaderInputCanvas from "./HeaderInputCanvas"
import { useState, type RefObject } from "react"

interface Props {
  canvasContext: RefObject<CanvasRenderingContext2D | null>
}

const CanvasAside = ({ canvasContext }: Props) => {
  function setColor(e: React.ChangeEvent<HTMLInputElement>) {
    if (canvasContext.current) {
      const value = e.currentTarget.value
      canvasContext.current.strokeStyle = value
      setCanvasColor(value)
    }
  }

  const [canvasColor, setCanvasColor] = useState<string>("black")
  const [canvasStroke, setCanvasStroke] = useState<number>(
    canvasContext.current?.lineWidth || 5,
  )

  return (
    <aside className="grid auto-rows-min gap-5 py-2 px-3.5 bg-[#1a3144] ">
      <Link
        to={"/"}
        className="flex gap-3.5 bg-[#121212] text-[#fafafa] px-3 py-2 rounded-full justify-self-start items-center outline-2 outline-[#121212] group hover:bg-[#fafafa] hover:text-[#121212] transition-[background-color,color] duration-300 ease-in-out"
      >
        <ChevronLeft className="sm:w-7 sm:h-7 max-sm:w-5 max-sm:h-5 group-hover:scale-125 [transition:scale_350ms_ease-in-out]" />
        <p className="sm:text-lg max-sm:text-base">To Home</p>
      </Link>
      <section className="justify-self-center self-center">
        <HeaderInputCanvas />
      </section>
      <section>
        <form className="flex flex-col gap-5 px-4 py-2">
          <section className="flex flex-col items-start gap-2">
            <label
              htmlFor="color-picker"
              className="text-[#fafafa] font-medium sm:text-lg max-sm:text-base"
            >
              Color
            </label>
            <input
              type="color"
              id="color-picker"
              value={canvasColor}
              onChange={setColor}
              className="w-full h-7 cursor-pointer"
            />
          </section>
          <section>
            <label
              htmlFor="stroke-setter"
              className="text-[#fafafa] font-medium sm:text-lg max-sm:text-base"
            >
              Stroke
            </label>
            <input
              type="number"
              className="w-full h-7 cursor-text text-[#fafafa] py-0.5 px-3 text-center sm:text-lg max-sm:text-base"
            />
          </section>
        </form>
      </section>
    </aside>
  )
}

export default CanvasAside
