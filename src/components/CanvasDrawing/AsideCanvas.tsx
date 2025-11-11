import { ChevronLeft, CircleX } from "lucide-react"
import { Link } from "react-router-dom"
import HeaderInputCanvas from "./HeaderInputCanvas"
import { type RefObject } from "react"
import type { CanvasElements, TypeDraw } from "../../types/CanvasType"

interface Props {
  canvasContext: RefObject<CanvasRenderingContext2D | null>
  canvasElement: RefObject<HTMLCanvasElement | null>
  typeOfDrawing: TypeDraw
  setTypeOfDrawing: (value: TypeDraw) => void
  setElementsOnPage: (value: CanvasElements[]) => void
  canvasStroke: string
  setCanvasStroke: (val: string) => void
  canvasStrokeWidth: number | string
  setCanvasStrokeWidth: (val: number | string) => void
}

const CanvasAside = ({
  canvasContext,
  canvasElement,
  typeOfDrawing,
  setTypeOfDrawing,
  setElementsOnPage,
  canvasStroke,
  setCanvasStroke,
  canvasStrokeWidth,
  setCanvasStrokeWidth,
}: Props) => {
  function setColor(e: React.ChangeEvent<HTMLInputElement>) {
    if (canvasContext.current) {
      const value = e.currentTarget.value
      setCanvasStroke(value)
    }
  }

  function setStrokeWidth(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value
    const intValue = parseInt(value, 10)
    if (!isNaN(intValue) && canvasContext.current) {
      setCanvasStrokeWidth(intValue)
    } else if (value === "" && canvasContext.current) {
      setCanvasStrokeWidth("")
    }
  }

  function clearCanvas() {
    if (canvasContext.current && canvasElement.current) {
      canvasContext.current.clearRect(
        0,
        0,
        canvasElement.current.clientWidth,
        canvasElement.current.clientHeight,
      )
      setElementsOnPage([])
    }
  }

  return (
    <aside className="grid grid-rows-[auto_auto_auto_1fr] gap-5 py-2 px-3.5 bg-[#1a3144] ">
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
      <section className="relative  bg-slate-600 rounded-2xl">
        <section className="relative z-2 flex justify-evenly">
          <button
            className={`px-3 py-2.5 outline-2 outline-transparent ${typeOfDrawing === "normal" ? "text-[#121212]" : "text-[#fafafa] active:scale-90 hover:outline-[#fafafa]"} [transition:color_300ms_ease-in-out,scale_250ms_ease-out,oultine-color_350ms_ease-in-out] rounded-full`}
            onClick={() => setTypeOfDrawing("normal")}
          >
            Pixel Perfect
          </button>
          <button
            className={`px-3 py-2.5 outline-2 outline-transparent ${typeOfDrawing === "rough" ? "text-[#121212]" : "text-[#fafafa] active:scale-90 hover:outline-[#fafafa]"} [transition:color_300ms_ease-in-out,scale_250ms_ease-out,outline-color_350ms_ease-in-out] rounded-full`}
            onClick={() => setTypeOfDrawing("rough")}
          >
            Hand drawn
          </button>
        </section>
        <div
          className={`absolute translate-x-0 ${typeOfDrawing === "normal" ? "translate-x-4" : "translate-x-[131%]"} bg-[#fafafa] w-[40%] h-full top-0 rounded-full transition-transform duration-300 ease-in-out`}
        ></div>
      </section>
      <section>
        <form
          className="flex flex-col gap-5 px-4 py-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <section className="flex flex-col gap-2">
            <label
              htmlFor="color-picker"
              className="text-[#fafafa] font-medium sm:text-lg max-sm:text-base"
            >
              Color
            </label>
            <input
              type="color"
              id="color-picker"
              value={canvasStroke}
              onChange={setColor}
              className="w-full h-7 cursor-pointer"
            />
          </section>
          <section className="flex flex-col gap-2">
            <label
              htmlFor="stroke-setter"
              className="text-[#fafafa] font-medium sm:text-lg max-sm:text-base"
            >
              Stroke
            </label>
            <input
              type="number"
              className="w-full h-7 cursor-text text-[#fafafa] py-5 px-2 text-center sm:text-lg max-sm:text-base outline-2 outline-[#C7CCDB] focus:outline-[#E1E5EE] rounded-full transition-[outline-color] duration-300 ease-in-out"
              inputMode="numeric"
              value={canvasStrokeWidth}
              onChange={setStrokeWidth}
              onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                e.currentTarget.select()
              }}
              onKeyDownCapture={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  ;(e.target as HTMLElement).blur()
                }
              }}
              onBlur={() => {
                if (canvasStrokeWidth === "") {
                  setCanvasStrokeWidth(1)
                }
              }}
            />
          </section>
        </form>
      </section>
      <section className="self-end px-3">
        <button
          className="bg-[#D6F7A3] text-[#121212] py-2 px-3.5 rounded-full flex gap-2.5 items-center hover:bg-[#581908] hover:text-[#fafafa] [transition:background-color_350ms_ease-in-out,color_350ms_ease-in-out,scale_250ms_ease-out] active:scale-90"
          onClick={clearCanvas}
        >
          <CircleX className="sm:w-8 sm:h-8 max-sm:w-6 max-sm:h-6" />
          Clear Canvas
        </button>
      </section>
    </aside>
  )
}

export default CanvasAside
