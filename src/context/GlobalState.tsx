import { useCallback, useRef, useState, type ReactNode } from "react"
import { AsideContext, InitialRenderContext } from "../hooks/contextHook"
import { ScrollContext } from "../hooks/scrollPosition"

const AsideStateSet = ({ children }: { children: ReactNode }) => {
  const [leftAsideOpen, setLeftAsideOpen] = useState(true)
  const [initialRender, setInitialRender] = useState(false)
  const scrollPosition = useRef({ scrollPosition: 0 })
  const setScrollPosition = useCallback((value: number) => {
    scrollPosition.current.scrollPosition = value
  }, [])
  const getScrollPosition = useCallback(() => {
    return scrollPosition.current.scrollPosition
  }, [])

  return (
    <AsideContext.Provider value={{ leftAsideOpen, setLeftAsideOpen }}>
      <InitialRenderContext.Provider
        value={{ initialRender, setInitialRender }}
      >
        <ScrollContext.Provider
          value={{
            scrollPosition: scrollPosition.current.scrollPosition,
            setScrollPosition,
            getScrollPosition,
          }}
        >
          {children}
        </ScrollContext.Provider>
      </InitialRenderContext.Provider>
    </AsideContext.Provider>
  )
}

export default AsideStateSet
