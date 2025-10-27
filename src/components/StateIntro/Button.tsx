import clsx from "clsx"
import { useEffect, useState } from "react"

interface Props{
    text: string,
    bgColor: string,
    textColor: string,
    hoverBgColor: string,
    hoverTextColor: string,
    onclick: () => void
}

const Button = ({text, bgColor, textColor, hoverBgColor, hoverTextColor,  onclick} : Props) => {
    function hover(value: boolean){
        if(!isTouchDevice)
            setIsHovered(value)
    }

    const [isHovered, setIsHovered] = useState(false)
    const [isTouchDevice, setIsTouchedDevice] = useState(false)
    const classNames = clsx({
        [bgColor]: !isHovered,
        [textColor]: !isHovered,
        [hoverBgColor]: isHovered,
        [hoverTextColor]: isHovered
    })

    useEffect(() => {
        if(typeof window !== "undefined"){
            setIsTouchedDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
        }
    }, [])

    return (
        <button className={`${classNames} sm:py-2 sm:px-5 max-sm:p-2 rounded-full cursor-pointer transition-[background-color, color, outline, outline-color, transform] duration-200 ease-out hover:outline-2 hover:outline-amber-200 active:scale-90 last:col-span-2`} onClick={onclick}
            onMouseEnter={() => hover(true)}
            onMouseLeave={() => hover(false)}
        >
            <p>{text}</p>
        </button>
    )
}

export default Button