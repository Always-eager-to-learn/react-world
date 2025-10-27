import Header from "../components/Header"
import Aside from "../components/home/Aside"
import { useState } from "react"
import { Outlet, useMatches } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import clsx from "clsx"
import type { IconsType } from "../types/IconsType"

const Home = () => {
  function changeStatus(value: boolean) {
    setLeftAsideOpen(value)
  }
  const [leftAsideOpen, setLeftAsideOpen] = useState(true)
  const fullSize = useMediaQuery({
    query: "(min-width: 84.375rem)",
  })
  const mediumSize = useMediaQuery({
    query: "(min-width: 75rem)",
  })
  const smallSize = useMediaQuery({
    query: "(min-width: 66.25rem)",
  })
  const gridCols = clsx({
    "grid-cols-[14rem_1fr]": smallSize,
    "grid-cols-[15.7rem_1fr]": mediumSize,
    "grid-cols-[17.7rem_1fr]": fullSize,
  })
  const matches = useMatches()
  const matchingArray = matches.find((match) => match?.handle)
  const handle = matchingArray?.handle as { title?: string; icon?: IconsType }
  const textToShow = handle?.title ? handle?.title : "React World"
  const iconToShow = handle?.icon ?? "vector-square"

  return (
    <section
      className={`grid ${leftAsideOpen ? gridCols : "grid-cols-[4.65rem_6fr]"} grid-rows-[auto_1fr] h-dvh transition-[grid-template-columns] duration-600 ease-in-out`}
    >
      <Header text={textToShow} home iconName={iconToShow} />
      <Aside isExpanded={leftAsideOpen} stateSetterFunction={changeStatus} />
      <main className="row-start-2 col-start-2 grid gap-4.5 bg-[#1a3144] py-3.5 px-2 grid-column auto-rows-max overflow-y-scroll">
        <Outlet />
      </main>
    </section>
  )
}

export default Home
