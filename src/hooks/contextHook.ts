import { createContext, useContext } from "react"

interface AsideOpenState {
  leftAsideOpen: boolean
  setLeftAsideOpen: (value: boolean) => void
}

interface InitialRenderState {
  initialRender: boolean
  setInitialRender: (value: boolean) => void
}

export const AsideContext = createContext<AsideOpenState | undefined>(undefined)
export const InitialRenderContext = createContext<
  InitialRenderState | undefined
>(undefined)

export function useAsideContext() {
  const contextValue = useContext(AsideContext)

  if (contextValue === undefined) {
    throw new Error("The context has not been initialized with a value.")
  }

  return contextValue
}

export function useInitialRenderContext() {
  const contextValue = useContext(InitialRenderContext)

  if (contextValue === undefined) {
    throw new Error(
      "The context initial render has not been initialized with a value",
    )
  }

  return contextValue
}
