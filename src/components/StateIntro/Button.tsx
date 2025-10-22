import clsx from "clsx"
import { useState } from "react"

interface Props{
    text: string,
    bgColor: string,
    textColor: string,
    hoverBgColor: string,
    hoverTextColor: string,
    onclick: () => void
}

const Button = ({text, bgColor, textColor, hoverBgColor, hoverTextColor,  onclick} : Props) => {
    const [isHovered, setIsHovered] = useState(false)
    const classNames = clsx({
        [bgColor]: !isHovered,
        [textColor]: !isHovered,
        [hoverBgColor]: isHovered,
        [hoverTextColor]: isHovered
    })

    return (
        <button className={`${classNames} sm:py-2 sm:px-5 max-sm:p-2 rounded-full cursor-pointer transition-[background-color, color, outline, outline-color, transform] duration-200 ease-out hover:outline-2 hover:outline-amber-200 active:scale-90 last:col-span-2`} onClick={onclick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <p>{text}</p>
        </button>
    )
}

export default Button