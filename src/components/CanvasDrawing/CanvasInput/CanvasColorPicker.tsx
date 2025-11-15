import clsx from "clsx"
import { X } from "lucide-react"
import { useRef, useState, type JSX } from "react"
import { HexAlphaColorPicker, HexColorInput } from "react-colorful"
import { type ColorType } from "../../../types/CanvasType"
import {
  colord,
  type RgbColor,
  type HslColor,
  type HsvColor,
  type RgbaColor,
} from "colord"
import CanvasPickerInput from "./CanvasPickerInput"

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

  function setInput(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    if (colorType === "rgb") {
      const result = event.currentTarget.value
      const value = parseInt(result, 10)
      if (value >= 0 && value <= 255) {
        colorValue.current[index] = value
        const [r, g, b, a] = colorValue.current
        setColor(
          colord({
            r,
            g,
            b,
            a,
          }).toHex(),
        )
      }
    }
  }

  function setColorInput() {
    let returnColor
    switch (colorType) {
      case "hsl": {
        returnColor = colord(color).toHsl()
        break
      }
      case "hsv": {
        const hsvColor = colord(color).toHsv()

        returnColor = `${hsvColor.a !== 1 ? "hsva" : "hsv"}(${hsvColor.h}, ${hsvColor.s}%, ${hsvColor.v}%${hsvColor.a !== 1 ? `, ${hsvColor.a}` : ""})`
        break
      }
      case "rgb": {
        returnColor = colord(color).toRgb()
      }
    }

    return returnColor
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
  const colorValue = useRef<number[]>([])
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
    case "rgb": {
      const color = setColorInput() as RgbaColor
      const { r, g, b, a } = color
      colorValue.current = [r, g, b, a]
      inputColorPicker = (
        <CanvasPickerInput
          type={colorType}
          value={colorValue.current}
          setInput={setInput}
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
        <form className={`flex gap-3 flex-col`}>
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
