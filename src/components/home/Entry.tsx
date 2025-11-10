import { DynamicIcon, type IconName } from "lucide-react/dynamic"
import { ArrowRightToLine } from "lucide-react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import type { ItemType } from "../../data/homelinks"

interface Props {
  name: string
  description: string
  icon: IconName
  location: string
  type: ItemType
}

const Entry = ({ name, description, icon, location, type }: Props) => {
  const styles = clsx({
    "bg-[#59A5D8]": type === "Experiment",
    "bg-[#ECA400]": type === "Project",
    "bg-[#F991CC]": type === "Design",
  })
  return (
    <section className="bg-[#f0fff4] rounded-2xl grid auto-rows-min p-4 gap-3.5 items-start">
      <div className="flex gap-3.5">
        <DynamicIcon
          name={icon}
          strokeWidth={2}
          className="stroke-[#29339B] sm:w-9.5 sm:h-9.5 max-sm:w-[1.8rem] max-sm:h-[1.8rem]"
        />

        <section>
          <h3 className="text-[#463F3A] sm:text-2xl max-sm:text-lg max-sm:font-medium">
            {name}
          </h3>
          <p className="text-[#463F3A] sm:text-lg max-sm:text-base">
            {description}
          </p>
        </section>
      </div>

      <section className="grid grid-cols-2 gap-4">
        <section className="flex gap-1.5 items-center">
          <div
            className={`sm:w-3.5 sm:h-3.5 max-sm:w-2 max-sm:h-2 rounded-full ${styles}`}
          ></div>
          <p className="sm:text-[1.015rem] max-sm:text-[0.95rem]">{type}</p>
        </section>
        <div className="row-start-2 col-start-1 col-end-3 justify-self-end">
          <Link
            to={location}
            className="flex gap-2.5 bg-[#FFB4A2] text-[#0D233D] px-5 py-2 rounded-full items-center outline-2 outline-transparent outline-offset-0 group hover:bg-[#1D2A63] hover:text-[#FFB4A2] hover:outline-[#9C3848] hover:outline-offset-2 transition-[background-color,color,outline-offset,outline-color] duration-300 ease-in"
          >
            <p className="group-hover:font-medium sm:text-lg max-sm:text-base">
              Visit the {type.toLowerCase()}
            </p>
            <ArrowRightToLine className="group-hover:scale-125 [transition:scale_300ms_ease-in-out] sm:w-6 sm:h-6 max-sm:w-4 max-sm:h-4" />
          </Link>
        </div>
      </section>
    </section>
  )
}

export default Entry
