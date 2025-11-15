import type { ChangeEvent } from "react"
import { getColorInput } from "../../../data/canvasInput"
import type { ColorType } from "../../../types/CanvasType"

interface Props {
  type: ColorType
  value: number[]
  setInput: (event: ChangeEvent<HTMLInputElement>, index: number) => void
}

const CanvasPickerInput = ({ type, value, setInput }: Props) => {
  const data = getColorInput(type)
  const inputs = data.map((element, index) => {
    return (
      <section className="flex gap-4 items-center">
        <label htmlFor={element.name} className="sm:text-xl max-sm:text-lg">
          {element.name}
        </label>
        <input
          type="range"
          id={element.name}
          min={element.min}
          max={element.max}
          value={value[index]}
          onChange={(e) => setInput(e, index)}
          className="w-full"
        />{" "}
      </section>
    )
  })

  return <section className="px-3.5 py-2 flex gap-4 flex-col">{inputs}</section>
}

export default CanvasPickerInput
