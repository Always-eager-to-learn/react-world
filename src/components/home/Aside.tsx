import OpenAside from "./OpenAside"
import CloseAside from "./CloseAside"
import { useCloseEventListener } from "../../hooks/eventListener"
import { useRef } from "react"

interface Props {
  tabDesign: boolean
  isExpanded: boolean
  stateSetterFunction: (value: boolean) => void
  smallHeightStatus: boolean
  tabSize: boolean
}

const Aside = ({
  isExpanded,
  stateSetterFunction,
  tabDesign,
  smallHeightStatus,
  tabSize,
}: Props) => {
  const refElement = useRef<HTMLElement>(null)
  useCloseEventListener({
    ref: refElement,
    handler: () => stateSetterFunction(false),
    isExpanded,
  })

  return (
    <section
      className={`row-start-1 row-end-3 col-start-1 ${tabDesign ? " [transition:translate_500ms_ease-in-out] relative z-10 w-60 justify-end" : ""} ${isExpanded && tabDesign ? "translate-x-0" : ""} bg-[#B4D4EF] grid grid-rows-[auto_auto_1fr] grid-cols-1 gap-4 px-2 py-3.5 ${smallHeightStatus && tabSize ? "-translate-x-[9.9rem]" : ""} ${smallHeightStatus ? "overflow-y-scroll custom-scrollbar" : ""} ${!smallHeightStatus && tabSize ? "-translate-x-[10.3rem]" : ""}`}
      ref={refElement}
    >
      {isExpanded ? (
        <OpenAside stateSetterFunction={() => stateSetterFunction(false)} />
      ) : (
        <CloseAside stateSetterFunction={() => stateSetterFunction(true)} />
      )}
    </section>
  )
}

export default Aside
