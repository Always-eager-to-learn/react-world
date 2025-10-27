import { nanoid } from "@sitnik/nanoid"
import type { JSX } from "react"

interface Props {
  design: "open" | "close"
  onClickEvent: () => void
}

const ButtonDiv = ({ design, onClickEvent }: Props) => {
  let jsxElements: JSX.Element[] = []
  if (design === "open") {
    jsxElements = Array(3)
      .fill(0)
      .map(() => {
        return (
          <div
            className="bg-[#121212] h-1 group-hover:bg-[#bfd2fa]"
            key={nanoid()}
          ></div>
        )
      })
  } else if (design === "close") {
    jsxElements.push(
      <div
        className="bg-[#121212] h-1 rotate-45 col-start-1 row-start-1 group-hover:bg-[#BFD2FA] transition-[background-color] duration-200 ease-in-out"
        key={nanoid()}
      ></div>,
    )
    jsxElements.push(
      <div
        className="bg-[#121212] h-1 -rotate-45 col-start-1 row-start-1 group-hover:bg-[#BFD2FA] transition-[background-color] duration-200 ease-in-out"
        key={nanoid()}
      ></div>,
    )
  }

  return (
    <button
      className={`justify-self-end w-12 ${design === "open" ? `flex flex-col gap-1.5 justify-center` : `grid items-center`} p-2 h-12 outline-[3px] outline-transparent bg-transparent group hover:bg-[#131F53] focus-visible:outline-[#131F53] active:scale-95 transition-[background-color, transform, outline-color] duration-200 ease-out rounded-2xl`}
      onClick={onClickEvent}
    >
      {jsxElements}
    </button>
  )
}

export default ButtonDiv
