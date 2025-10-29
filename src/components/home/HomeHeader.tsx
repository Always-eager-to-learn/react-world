import clsx from "clsx"
import { DynamicIcon, type IconName } from "lucide-react/dynamic"
import ButtonDiv from "../ButtonDiv"
import OpenAside from "./OpenAside"
import { useRef } from "react"
// import { useCloseEventListener } from "../../hooks/eventListener"

interface Props {
  text: string
  iconName: IconName
  phoneDesignStatus: boolean
  expandedState: boolean
  expandedStateSetterFunction: (value: boolean) => void
}

const HomeHeader = ({
  text,
  iconName,
  phoneDesignStatus,
  expandedState,
  expandedStateSetterFunction,
}: Props) => {
  const containerStyles = clsx({
    grid: phoneDesignStatus,
    "grid-cols-[1fr_6fr]": phoneDesignStatus,
    "bg-[#264A91]": true,
    "py-3": true,
    "sm:px-5": true,
    "max-sm:px-2.5": true,
    "col-start-2": true,
    "col-end-4": true,
    "row-start-1": true,
  })
  const sectionStyle = clsx({
    "expanded-section": true,
    show: expandedState,
  })
  const sectionElement = useRef<HTMLElement>(null)
  // useCloseEventListener({
  //   ref: sectionElement,
  //   handler: () => console.log("Hi"),
  // })

  return (
    <header className={`${containerStyles}`}>
      {phoneDesignStatus ? (
        <section>
          <section
            className={`${expandedState ? "opacity-0" : "opacity-100"} transition-[opacity] duration-300 ease-in-out`}
          >
            <ButtonDiv
              design="open"
              onClickEvent={() => expandedStateSetterFunction(true)}
              smallScreenDesign
            />
          </section>
          <section
            className={`fixed top-0 left-0 h-dvh grid grid-rows-[auto_auto_1fr] gap-3.5 ${sectionStyle} p-3.5  bg-[#b4d4ef]`}
            ref={sectionElement}
          >
            <OpenAside
              stateSetterFunction={() => expandedStateSetterFunction(false)}
            />
          </section>
        </section>
      ) : null}
      <section
        className={`${phoneDesignStatus ? "col-start-2" : ""} flex gap-4 items-center justify-center text-[#fafafa] hover:text-[#d7ee09] transition-[color] duration-200 ease-in-out`}
      >
        <h1 className="md:text-3xl max-md:text-xl font-medium">{text}</h1>
        <DynamicIcon name={iconName} size={phoneDesignStatus ? 24 : 30} />
      </section>
    </header>
  )
}

export default HomeHeader
