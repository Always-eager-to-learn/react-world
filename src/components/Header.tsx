import clsx from "clsx"
import { Link } from "react-router-dom"
import { ChevronsLeft } from "lucide-react"
import { memo } from "react"
import { DynamicIcon } from "lucide-react/dynamic"
import type { IconsType } from "../types/IconsType"

interface Props {
  text: string
  backButton?: boolean
  home?: boolean
  iconName?: IconsType
  tabDesign?: boolean
}

const Header = ({
  text,
  backButton,
  home = false,
  iconName,
  tabDesign,
}: Props) => {
  const containerStyles = clsx({
    flex: !backButton,
    "justify-center": !backButton,
    grid: backButton,
    "grid-cols-[100px_1fr_1fr]": backButton,
    "bg-[#264A91]": true,
    "py-3": true,
    "col-start-2": true,
    "row-start-1": true,
    "col-end-4": tabDesign,
  })

  const elementStyles = clsx({
    "col-start-2": backButton,
    "justify-self-center": backButton,
  })

  return (
    <header className={`${containerStyles} ${home ? "sticky top-0" : ""} px-4`}>
      {backButton ? (
        <div>
          <Link
            to={"/"}
            className="bg-[#D9E5FC] flex items-center w-max sm:px-4 max-sm:px-2 py-2.5 rounded-full group outline-2 outline-transparent hover:bg-[#142F61] hover:outline-[#fafafa] transition-[background-color, outline-color] duration-200 ease-in-out"
          >
            <ChevronsLeft
              size={20}
              className="stroke-[#121212] group-hover:stroke-[#D9E5FC] transition-[stroke] duration-150 ease-in"
            />
            <p className="text-[#121212] group-hover:text-[#D9E5FC] transition-[color] duration-150 ease-in">
              Back
            </p>
          </Link>
        </div>
      ) : null}

      <section
        className={`${elementStyles} col-span-2 text-center ${iconName !== undefined ? `flex gap-4 items-center` : ``} text-[#fafafa] hover:text-[#D7EE09]  `}
      >
        <h1
          className={`md:text-3xl max-md:text-xl font-medium transition-[color] duration-200 ease-in`}
        >
          {text}
        </h1>
        {iconName !== undefined ? (
          <DynamicIcon name={iconName} size={28} />
        ) : null}{" "}
      </section>
    </header>
  )
}

export default memo(Header)
