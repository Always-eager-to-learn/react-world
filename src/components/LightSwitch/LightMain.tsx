import clsx from "clsx"
import { Moon, Sun } from "lucide-react"
import { useState } from "react"

const LightMain = () => {
  const [lightStatus, setLightStatus] = useState(false)
  const colorStyles = clsx({
    "bg-[#1a3144]": !lightStatus,
    "bg-yellow-200": lightStatus,
  })
  const firstButtonStyles = clsx({
    "bg-[#FAFAFA]": lightStatus,
    "bg-[#B9CEE8]": !lightStatus,
    "outline-2": true,
    "outline-transparent": !lightStatus,
    "outline-[#121212]": lightStatus,
    // "text-[#"
  })
  const secondButtonStyles = clsx({
    "outline-2": true,
    "outline-transparent": lightStatus,
    "outline-[#FAFAFA]": !lightStatus,
    "bg-slate-700": lightStatus,
    "bg-[#FAFAFA]": !lightStatus,
    "text-[#FAFAFA]": lightStatus,
  })

  return (
    <main
      className={`${colorStyles} grow flex items-center justify-center p-7 transition-[background-color] duration-300 ease-in-out`}
    >
      <button
        className="group p-0.5"
        onClick={() => setLightStatus((prev) => !prev)}
      >
        <div
          className={`h-32 w-16 ${firstButtonStyles} flex justify-center items-center rounded-t-4xl [transition:background-color_300ms_ease-in-out,outline-color_300ms_ease-in-out,scale_200ms_ease-out] ${lightStatus ? `group-active:scale-90` : ``}`}
        >
          {!lightStatus ? <Sun size={33} /> : null}
        </div>
        <div
          className={`h-32 w-16 flex justify-center items-center [transition:scale_200ms_ease-out,background-color_300ms_ease-in-out,outline-color_300ms_ease-in-out] ${!lightStatus ? `group-active:scale-90` : ``} ${secondButtonStyles} rounded-b-4xl`}
        >
          {lightStatus ? <Moon size={33} /> : null}
        </div>
      </button>
    </main>
  )
}

export default LightMain
