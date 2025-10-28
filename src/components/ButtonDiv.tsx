import { nanoid } from "@sitnik/nanoid"
import { useState, type JSX, useEffect } from "react"

interface Props {
  design: "open" | "close"
  onClickEvent: () => void
  smallScreenDesign?: boolean
}

const ButtonDiv = ({
  design,
  onClickEvent,
  smallScreenDesign = false,
}: Props) => {
  const [showButton, setShowButton] = useState(false)
  let jsxElements: JSX.Element[] = []
  if (design === "open") {
    jsxElements = Array(3)
      .fill(0)
      .map(() => {
        return (
          <div
            className={` ${smallScreenDesign ? "bg-[#E6E8E6] group-hover:bg-[#264a91]" : "bg-[#121212] group-hover:bg-[#bfd2fa]"} h-1 first:w-[70%] last:w-[43%]`}
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
      className={`row-start-1 w-12 ${design === "open" ? `flex flex-col gap-1.5 justify-center justify-self-end -translate-x-1` : `grid items-center justify-self-end`} p-2 h-12 outline-[3px] outline-transparent bg-transparent group ${smallScreenDesign ? "hover:bg-[#E6E8E6] focus-visible:outline-[#E6E8E6]" : " hover:bg-[#131F53] focus-visible:outline-[#131F53]"} active:scale-90 [transition:background-color_300ms_ease-in-out,scale_250ms_ease-out,outline-color_300ms_ease-in-out,opacity_200ms_ease-in-out] rounded-2xl ${showButton ? `opacity-100` : `opacity-0`}`}
      onClick={onClickEvent}
    >
      {jsxElements}
    </button>
  )
}

export default ButtonDiv
