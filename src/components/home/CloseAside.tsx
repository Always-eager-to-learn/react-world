import { DynamicIcon } from "lucide-react/dynamic"
import { navigationLinks } from "../../data/navigationLinks"
import ButtonDiv from "../ButtonDiv"
import { nanoid } from "@sitnik/nanoid"
import { NavLink } from "react-router-dom"
import ViewSourceButton from "./ViewSourceButton"

interface Props {
  stateSetterFunction: () => void
}

const CloseAside = ({ stateSetterFunction }: Props) => {
  const jsxElements = navigationLinks.map(({ iconName, location }) => {
    return (
      <NavLink
        to={location}
        className={`p-4 bg-[#20447e] text-[#FEF5FD] rounded-full outline-2 outline-transparent hover:bg-[#FEF5FD] hover:text-[#20447e] cursor-pointer active:scale-90 hover:outline-[#20447E] [transition:transform_250ms_ease-out,background-color_300ms_ease-in-out,color_300ms_ease-in,outline-color_300ms_ease-in-out]"`}
        key={nanoid()}
      >
        <DynamicIcon name={iconName} />
      </NavLink>
    )
  })
  return (
    <>
      <section className="grid gap-4">
        <ButtonDiv design="open" onClickEvent={stateSetterFunction} />
        <aside className="justify-self-center">
          <nav className="flex flex-col gap-3">{jsxElements}</nav>
        </aside>
      </section>
      <section className="self-center">
        <ViewSourceButton />
      </section>
    </>
  )
}

export default CloseAside
