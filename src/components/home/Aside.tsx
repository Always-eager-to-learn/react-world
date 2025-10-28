import OpenAside from "./OpenAside"
import CloseAside from "./CloseAside"

interface Props {
  tabDesign: boolean
  isExpanded: boolean
  stateSetterFunction: (value: boolean) => void
}

const Aside = ({ isExpanded, stateSetterFunction, tabDesign }: Props) => {
  return (
    <section
      className={`row-start-1 row-end-3 col-start-1 ${tabDesign ? "w-60 [transition:translate_500ms_ease-in-out] relative z-10 -translate-x-[10.3rem] justify-end" : ""} ${isExpanded && tabDesign ? "translate-x-0" : ""} h-full bg-[#B4D4EF] grid grid-rows-[auto_auto_1fr] grid-cols-1 gap-4 px-2 py-3.5`}
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
