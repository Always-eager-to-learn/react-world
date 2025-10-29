import clsx from "clsx"
import { Link } from "react-router-dom"
import { ChevronsLeft } from "lucide-react"
import { memo } from "react"

interface Props {
  text: string
  backButton?: boolean
}

const Header = ({ text, backButton }: Props) => {
  const containerStyles = clsx({
    flex: !backButton,
    "justify-center": !backButton,
    grid: backButton,
    "grid-cols-[100px_1fr_1fr]": backButton,
    "bg-[#264A91]": true,
    "py-3": true,
  })

  const elementStyles = clsx({
    "col-start-2": backButton,
    "justify-self-center": backButton,
  })

  return (
    <header className={`${containerStyles} px-4`}>
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
        className={`${elementStyles} col-span-2 text-center text-[#fafafa] hover:text-[#D7EE09]`}
      >
        <h1
          className={`md:text-3xl max-md:text-xl font-medium transition-[color] duration-200 ease-in`}
        >
          {text}
        </h1>
      </section>
    </header>
  )
}

export default memo(Header)
