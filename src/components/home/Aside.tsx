import OpenAside from "./OpenAside"
import CloseAside from "./CloseAside"

interface Props {
  isExpanded: boolean
  stateSetterFunction: (value: boolean) => void
}

const Aside = ({ isExpanded, stateSetterFunction }: Props) => {
  return (
    <section
      className={`row-start-2 col-start-1 h-full bg-[#B4D4EF] grid px-4 py-3.5 auto-rows-max transition-transform duration-500 ease-in-out`}
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
