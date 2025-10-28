import { DynamicIcon, type IconName } from "lucide-react/dynamic"
import { ArrowRightToLine } from "lucide-react"
import { Link } from "react-router-dom"

interface Props {
  name: string
  description: string
  icon: IconName
  location: string
}

const Entry = ({ name, description, icon, location }: Props) => {
  return (
    <section className="bg-[#f0fff4] rounded-2xl flex flex-col p-4 gap-3.5 items-start">
      <div className="flex gap-3.5">
        <DynamicIcon name={icon} size={38} className="stroke-[#29339B]" />

        <section>
          <h3 className="text-[#463F3A] text-2xl">{name}</h3>
          <p className="text-[#463F3A]">{description}</p>
        </section>
      </div>

      <div className="self-end">
        <Link
          to={location}
          className="flex gap-2.5 bg-[#FFB4A2] text-[#0D233D] px-5 py-2 rounded-full items-center outline-2 outline-transparent outline-offset-0 group hover:bg-[#1D2A63] hover:text-[#FFB4A2] hover:outline-[#0d233d] hover:outline-offset-[2px] transition-[background-color,color,outline-offset,outline-color] duration-300 ease-in"
        >
          <p className="group-hover:font-medium md:text-lg max-md:text-base">
            Visit the design
          </p>
          <ArrowRightToLine size={22} />
        </Link>
      </div>
    </section>
  )
}

export default Entry
