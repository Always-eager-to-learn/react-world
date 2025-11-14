import clsx from "clsx"
import { X } from "lucide-react"
import { useRef, useState, type JSX } from "react"
import { HexAlphaColorPicker, HexColorInput } from "react-colorful"
import { type ColorType } from "../../types/CanvasType"
import { colord, type RgbColor, type HslColor, type HsvColor } from "colord"

interface Props {
  color: string
  setColor: (val: string) => void
  showColor: boolean
  setShowColor: (val: boolean) => void
}

const CanvasColorPicker = ({
  color,
  setColor,
  showColor,
  setShowColor,
}: Props) => {
  function changeColor(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value as ColorType
    setColorType(value)
  }

  function setStroke(newColor: RgbColor | HsvColor | HslColor | string) {
    const hexColor = colord(newColor).toHex()
    setColor(hexColor)
  }

  function setColorInput() {
    let returnColor
    switch (colorType) {
      case "hsl": {
        returnColor = colord(color).toHslString()
        break
      }
      case "hsv": {
        const hsvColor = colord(color).toHsv()

        returnColor = `${hsvColor.a !== 1 ? "hsva" : "hsv"}(${hsvColor.h}, ${hsvColor.s}%, ${hsvColor.v}%${hsvColor.a !== 1 ? `, ${hsvColor.a}` : ""})`
        break
      }
      case "rgb": {
        returnColor = colord(color).toRgbString()
      }
    }

    return returnColor
  }

  function setDefaultColor(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value
    switch (colorType) {
      case "rgb": {
        if (!typingState.current) {
          typingState.current = true
        }
        const regex = "rgb(a){0,1}(([0-255], [0-255], [0-255], (0-1){0,1}))"
      }
    }
  }

  const styles = clsx({
    "opacity-0": !showColor,
    "opacity-100": showColor,
    "-translate-x-10": !showColor,
    "-translate-x-82": showColor,
    "-translate-y-45": true,
    "pointer-events-none": !showColor,
  })

  const [colorType, setColorType] = useState<ColorType>("hex")
  const typingState = useRef(false)
  let inputColorPicker: JSX.Element | null = null
  switch (colorType) {
    case "hex": {
      inputColorPicker = (
        <HexColorInput
          color={color}
          onChange={setStroke}
          prefixed
          alpha
          className="w-full outline-2 outline-[#121212] px-1.5 py-0.5 rounded-xl"
        />
      )
      break
    }
    default: {
      const color = setColorInput()
      inputColorPicker = (
        <input
          value={color}
          onChange={setDefaultColor}
          className="w-full outline-2 outline-[#121212] px-1.5 py-0.5 rounded-xl"
        />
      )
    }
  }

  return (
    <section
      className={`bg-[#fafafa] py-2 px-2.5 rounded-xl ${styles} absolute grid grid-cols-[3fr_0.2fr] gap-3 -z-1`}
    >
      <section className="col-start-2">
        <button
          className="hover:bg-[#121212] hover:text-[#fafafa] active:scale-90 outline-2 outline-transparent focus-visible:outline-[#121212] rounded-full [transition:background-color_450ms_ease-in-out,scale_250ms_ease-out,stroke-color_200ms_ease-in-out,outline-color_350ms_ease-in-out] px-1.5 py-1"
          onClick={() => setShowColor(false)}
        >
          <X className="sm:w-8 sm:h-8 max-sm:w-6 max-sm:h-6" />
        </button>
      </section>
      <section className="col-start-1 row-start-1">
        <HexAlphaColorPicker color={color} onChange={setColor} />
      </section>
      <section className="col-start-1 row-start-2 col-end-3">
        <form className="flex gap-3">
          <label htmlFor="color-picker" className="h-0 w-0 overflow-hidden">
            Select a color
          </label>
          <select
            name="color-picker-input"
            id="color-picker"
            className="cursor-pointer px-2"
            onChange={changeColor}
          >
            <option value="hex">HEX</option>
            <option value="rgb">RGB</option>
            <option value="hsl">HSL</option>
            <option value="hsv">HSV</option>
          </select>
          {inputColorPicker}
        </form>
      </section>
    </section>
  )
}

export default CanvasColorPicker
