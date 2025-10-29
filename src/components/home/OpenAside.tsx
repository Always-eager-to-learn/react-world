import { nanoid } from "@sitnik/nanoid"
import { ChevronRight } from "lucide-react"
import { DynamicIcon } from "lucide-react/dynamic"
import { useMediaQuery } from "react-responsive"
import { NavLink, type NavLinkRenderProps } from "react-router-dom"
import { navigationLinks } from "../../data/navigationLinks"
import ButtonDiv from "../ButtonDiv"
import ViewSourceButton from "./ViewSourceButton"

interface Props {
  stateSetterFunction: () => void
}

const OpenAside = ({ stateSetterFunction }: Props) => {
  function setClassName(obj: NavLinkRenderProps) {
    return `${obj.isActive ? "bg-[#fdf0d5] text-[#35322c] hover:bg-[#F0F1F6] hover:text-[#1A1263] fill-[#000]" : "bg-[#20447E] text-[#FEF5FD] hover:bg-[#FEF5FD] hover:text-[#20447e]"} sm:px-3 sm:py-3.5 max-sm:p-2.5 text-lg flex justify-between items-center rounded-2xl outline-2 outline-transparent group  active:scale-90 hover:outline-[#20447e] [transition:background-color_300ms_ease-in-out,color_300ms_ease-in,scale_250ms_ease-out,outline-color_300ms_ease-in-out]`
  }

  const toShowIcon = useMediaQuery({
    query: "(min-width: 90.06rem)",
  })

  const jsxElements = navigationLinks.map((element) => {
    return (
      <NavLink className={setClassName} to={element.location} key={nanoid()}>
        <section className="flex gap-3 items-center overflow-hidden">
          <DynamicIcon
            name={element.iconName}
            strokeWidth={2}
            className="sm:w-[1.75rem] sm:h-[1.75rem] max-sm:w-[1.25rem] max-sm:h-[1.25rem]"
          />
          <p className="md:text-lg max-md:text-base">{element.name}</p>
        </section>
        {toShowIcon ? (
          <ChevronRight className="opacity-0 group-hover:opacity-100 transition-[opacity] duration-200 ease-in-out" />
        ) : null}
      </NavLink>
    )
  })

  return (
    <>
      <ButtonDiv design="close" onClickEvent={stateSetterFunction} />
      <aside className="row-start-2">
        <nav className="flex flex-col gap-3">{jsxElements}</nav>
      </aside>
      <section className="row-start-3 flex justify-center items-end">
        <ViewSourceButton shouldDisplayText />
      </section>
    </>
  )
}

export default OpenAside
