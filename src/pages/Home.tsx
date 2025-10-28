import Aside from "../components/home/Aside"
import { useState, useEffect } from "react"
import { Outlet, useMatches } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import clsx from "clsx"
import { defaultOne } from "../data/navigationLinks"
import type { IconName } from "lucide-react/dynamic"
import HomeHeader from "../components/home/HomeHeader"

const Home = () => {
  function changeStatus(value: boolean) {
    setLeftAsideOpen(value)
  }

  const [leftAsideOpen, setLeftAsideOpen] = useState(true)
  const tabSize = useMediaQuery({
    query: "(min-width: 40.625rem) and (max-width:66.25rem)",
  })
  const phoneSize = useMediaQuery({
    query: "(max-width: 40.625rem)",
  })

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
    "grid-cols-[14rem_6fr]": smallSize,
    "grid-cols-[15.7rem_6fr]": mediumSize,
    "grid-cols-[17.7rem_6fr]": fullSize,
  })
  const gridStatusStyles = clsx({
    [gridCols]: leftAsideOpen && !tabSize && !phoneSize,
    "grid-cols-[4.65rem_6fr]": !leftAsideOpen || (tabSize && !phoneSize),
    "grid-cols-[6fr]": phoneSize,
  })

  const matches = useMatches()
  const matchingArray = matches.find((match) => match?.handle)
  const handle = matchingArray?.handle as { title?: string; icon?: IconName }
  const textToShow = handle?.title ? handle?.title : "React World"
  const iconToShow = handle?.icon ?? defaultOne

  useEffect(() => {
    if (tabSize) {
      setLeftAsideOpen(false)
    } else if (!tabSize && !phoneSize) {
      setLeftAsideOpen(true)
    } else if (phoneSize) {
      setLeftAsideOpen(false)
    } else {
      setLeftAsideOpen(true)
    }
  }, [tabSize, phoneSize])

  return (
    <section
      className={`grid ${gridStatusStyles} grid-rows-[auto_1fr] h-dvh transition-[grid-template-columns] duration-1000 ease-in-out`}
    >
      <HomeHeader
        text={textToShow}
        iconName={iconToShow}
        phoneDesignStatus={phoneSize}
        expandedState={leftAsideOpen}
        expandedStateSetterFunction={changeStatus}
      />
      {!phoneSize ? (
        <Aside
          isExpanded={leftAsideOpen}
          stateSetterFunction={changeStatus}
          tabDesign={tabSize}
        />
      ) : null}
      <main
        className={`row-start-2 col-start-2 ${tabSize ? "col-end-4" : ""} grid gap-4.5 bg-[#1a3144] py-3.5 px-2 grid-column auto-rows-max overflow-y-scroll`}
      >
        <Outlet />
      </main>
    </section>
  )
}

export default Home
