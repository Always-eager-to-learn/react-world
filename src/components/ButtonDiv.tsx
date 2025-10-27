import { nanoid } from "@sitnik/nanoid"
import { useState, type JSX, useEffect } from "react"

interface Props {
  design: "open" | "close"
  onClickEvent: () => void
}

const ButtonDiv = ({ design, onClickEvent }: Props) => {
  const [showButton, setShowButton] = useState(false)
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

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowButton(true)
    }, 700)

    return () => {
      clearTimeout(timerId)
    }
  }, [])

  return (
    <button
      className={`row-start-1 w-12 ${design === "open" ? `flex flex-col gap-1.5 justify-center justify-self-center` : `grid items-center justify-self-end`} p-2 h-12 outline-[3px] outline-transparent bg-transparent group hover:bg-[#131F53] focus-visible:outline-[#131F53] active:scale-90 [transition:background-color_300ms_ease-in-out,transform_250ms_ease-out,outline-color_300ms_ease-in-out,opacity_200ms_ease-in-out] rounded-2xl ${showButton ? `opacity-100` : `opacity-0`}`}
      onClick={onClickEvent}
    >
      {jsxElements}
    </button>
  )
}

export default ButtonDiv
