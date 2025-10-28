import { createContext, useContext } from "react"
import { useState, type ReactNode } from "react"

interface StateType {
  leftAsideOpen: boolean
  setLeftAsideOpen: (value: boolean) => void
}

const MainContext = createContext<StateType | undefined>(undefined)

const StateSetter = ({ children }: { children: ReactNode }) => {
  const [leftAsideOpen, setLeftAsideOpen] = useState(true)

  return (
    <MainContext.Provider value={{ leftAsideOpen, setLeftAsideOpen }}>
      {children}
    </MainContext.Provider>
  )
}

const useStateContext = () => {
  const stateValue = useContext(MainContext)
  if (stateValue === undefined) {
    throw new Error(
      "Please ensure that the context has been created first before it can be used",
    )
  }
  return stateValue
}

export { useStateContext, StateSetter }
