import { DynamicIcon } from "lucide-react/dynamic"
import { navigationLinks } from "../../data/navigationLinks"
import ButtonDiv from "../ButtonDiv"
import { nanoid } from "@sitnik/nanoid"
import { NavLink, type NavLinkRenderProps } from "react-router-dom"
import ViewSourceButton from "./ViewSourceButton"

interface Props {
  stateSetterFunction: () => void
}

const CloseAside = ({ stateSetterFunction }: Props) => {
  function setClassName(obj: NavLinkRenderProps) {
    return `${obj.isActive ? "bg-[#fdf0d5] text-[#35322c] hover:bg-[#F0F1F6] hover:text-[#1A1263]" : "bg-[#20447e] text-[#FEF5FD] hover:bg-[#FEF5FD] hover:text-[#20447e] "} p-4  rounded-full outline-2 outline-transparent cursor-pointer active:scale-90 hover:outline-[#20447E] [transition:scale_250ms_ease-out,background-color_300ms_ease-in-out,color_300ms_ease-in,outline-color_300ms_ease-in-out]`
  }
  const jsxElements = navigationLinks.map(({ iconName, location }) => {
    return (
      <NavLink to={location} className={setClassName} key={nanoid()}>
        <DynamicIcon name={iconName} />
      </NavLink>
    )
  })
  return (
    <>
      <ButtonDiv design="open" onClickEvent={stateSetterFunction} />
      <aside className="justify-self-center">
        <nav className="row-start-2 flex flex-col gap-3">{jsxElements}</nav>
      </aside>
      <section className="row-start-3 flex justify-center items-end">
        <ViewSourceButton />
      </section>
    </>
  )
}

export default CloseAside
