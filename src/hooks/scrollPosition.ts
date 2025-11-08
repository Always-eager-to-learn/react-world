import { useContext, createContext } from "react"

interface ScrollPosition {
  scrollPosition: number
  setScrollPosition: (value: number) => void
  getScrollPosition: () => number
}

export function useScrollChange() {
  const scrollRef = useContext(ScrollContext)
  if (scrollRef === undefined) {
    throw Error("ScrollContext context is not initialized.")
  }

  return scrollRef
}

export const ScrollContext = createContext<ScrollPosition | undefined>(
  undefined,
)
