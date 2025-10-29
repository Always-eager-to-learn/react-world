import { useState, type ReactNode } from "react"
import { AsideContext, InitialRenderContext } from "../hooks/contextHook"

const AsideStateSet = ({ children }: { children: ReactNode }) => {
  const [leftAsideOpen, setLeftAsideOpen] = useState(true)
  const [initialRender, setInitialRender] = useState(false)

  return (
    <AsideContext.Provider value={{ leftAsideOpen, setLeftAsideOpen }}>
      <InitialRenderContext.Provider
        value={{ initialRender, setInitialRender }}
      >
        {children}
      </InitialRenderContext.Provider>
    </AsideContext.Provider>
  )
}

export default AsideStateSet
