import OpenAside from "./OpenAside"
import CloseAside from "./CloseAside"

interface Props {
  isExpanded: boolean
  stateSetterFunction: (value: boolean) => void
}

const Aside = ({ isExpanded, stateSetterFunction }: Props) => {
  return (
    <section
      className={`row-start-1 row-end-3 col-start-1 h-full bg-[#B4D4EF] flex flex-col justify-between gap-4 px-2 py-3.5`}
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
