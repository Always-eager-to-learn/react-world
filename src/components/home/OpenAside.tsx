import { DynamicIcon } from "lucide-react/dynamic"
import { navigationLinks } from "../../data/navigationLinks"
import ButtonDiv from "../ButtonDiv"
import { Link } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import { ChevronRight, Heart } from "lucide-react"
import { nanoid } from "@sitnik/nanoid"

interface Props {
  stateSetterFunction: () => void
}

const OpenAside = ({ stateSetterFunction }: Props) => {
  const toShowIcon = useMediaQuery({
    query: "(min-width: 90.06rem)",
  })

  const jsxElements = navigationLinks.map((element) => {
    return (
      <Link
        className="px-3 py-3.5 bg-[#20447E] text-lg text-[#FEF5FD] flex justify-between items-center rounded-2xl outline-2 outline-transparent group hover:bg-[#FEF5FD] hover:text-[#20447e] active:scale-90 hover:outline-[#20447e] [transition:background-color_300ms_ease-in-out,color_300ms_ease-in,scale_250ms_ease-out,outline-color_300ms_ease-in-out]"
        to={element.location}
        key={nanoid()}
      >
        <section className="flex gap-3 items-center">
          <DynamicIcon name={element.iconName} size={28} />
          <p>{element.name}</p>
        </section>
        {toShowIcon ? (
          <ChevronRight className="opacity-0 group-hover:opacity-100 transition-[opacity] duration-200 ease-in-out" />
        ) : null}
      </Link>
    )
  })

  return (
    <>
      <section className="grid gap-4">
        <ButtonDiv design="close" onClickEvent={stateSetterFunction} />
        <aside>
          <nav className="flex flex-col gap-3">{jsxElements}</nav>
        </aside>
      </section>
      <section>
        <a
          href="https://github.com/Always-eager-to-learn/react-world"
          className="bg-[#30343F] text-[#f4f4f4] flex gap-3.5 rounded-2xl px-5 py-3.5 justify-center items-center hover:bg-[#f4f4f4] hover:text-[#30343f] outline-2 outline-transparent hover:outline-[#30343f] [transition:background-color_300ms_ease-in-out,color_300ms_ease-in,outline-color_300ms_ease-in-out]"
          target="_blank"
        >
          <p className="text-base">View Source Code</p>
          <Heart size={28} />
        </a>
      </section>
    </>
  )
}

export default OpenAside
