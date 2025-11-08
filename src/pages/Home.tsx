import Aside from "../components/home/Aside"
import { useEffect, useRef, type UIEvent, useLayoutEffect } from "react"
import { Outlet, useMatches } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import clsx from "clsx"
import { defaultOne } from "../data/navigationLinks"
import type { IconName } from "lucide-react/dynamic"
import HomeHeader from "../components/home/HomeHeader"
import { useAsideContext, useInitialRenderContext } from "../hooks/contextHook"
import { useScrollChange } from "../hooks/scrollPosition"

const Home = () => {
  function changeStatus(value: boolean) {
    setLeftAsideOpen(value)
  }

  function handleScroll(event: UIEvent<HTMLElement>) {
    scrollValue.setScrollPosition(event.currentTarget.scrollTop)
  }

  const { leftAsideOpen, setLeftAsideOpen } = useAsideContext()
  const { initialRender, setInitialRender } = useInitialRenderContext()
  const scrollValue = useScrollChange()
  const isLoading = useRef(true)
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
  const smallHeightStatus = useMediaQuery({
    query: "(max-height: 31rem)",
  })

  const gridCols = clsx({
    "grid-cols-[14rem_6fr]": smallSize,
    "grid-cols-[15.7rem_6fr]": mediumSize,
    "grid-cols-[17.7rem_6fr]": fullSize,
  })
  const gridStatusStyles = clsx({
    [gridCols]: leftAsideOpen && !tabSize && !phoneSize,
    "grid-cols-[4.65rem_6fr]":
      (!smallHeightStatus && !leftAsideOpen) || (tabSize && !phoneSize),
    "grid-cols-[5.1rem_6fr]":
      (!leftAsideOpen && smallHeightStatus) ||
      (tabSize && smallHeightStatus && !phoneSize),
    "grid-cols-[6fr]": phoneSize,
  })

  const matches = useMatches()
  const matchingArray = matches.find((match) => match?.handle)
  const handle = matchingArray?.handle as { title?: string; icon?: IconName }
  const textToShow = handle?.title ? handle?.title : "React World"
  const iconToShow = handle?.icon ?? defaultOne
  const mainSectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (tabSize && !initialRender) {
      setInitialRender(true)
      setLeftAsideOpen(false)
    } else if (!tabSize && initialRender) {
      setInitialRender(false)
    } else if (phoneSize) {
      setLeftAsideOpen(false)
    }
  }, [tabSize, phoneSize, setLeftAsideOpen, initialRender, setInitialRender])

  useEffect(() => {
    if (isLoading && mainSectionRef.current !== null) {
      mainSectionRef.current.scrollTo({
        top: scrollValue.getScrollPosition(),
        behavior: "instant",
      })
      isLoading.current = true
    }
  }, [isLoading, scrollValue])

  return (
    <section
      className={`grid ${gridStatusStyles} grid-rows-[auto_1fr] h-dvh transition-[grid-template-columns] duration-800 ease-[cubic-bezier(0.518,0.138,0.41,0.872)]`}
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
          smallHeightStatus={smallHeightStatus}
          tabSize={tabSize}
        />
      ) : null}
      <main
        className={`row-start-2 ${phoneSize ? "col-start-1 px-5" : "col-start-2 px-7"} ${tabSize || phoneSize ? "col-end-4" : ""} grid gap-4.5 bg-[#1a3144] py-4 grid-column auto-rows-max overflow-y-scroll custom-scrollbar`}
        ref={mainSectionRef}
        onScrollEnd={handleScroll}
      >
        <Outlet />
      </main>
    </section>
  )
}

export default Home
