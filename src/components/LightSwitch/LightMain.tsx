import clsx from "clsx"
import { Moon, Sun } from "lucide-react"
import { useState } from "react"

const LightMain = () => {
    const [lightStatus, setLightStatus] = useState(false)
    const colorStyles = clsx({
        'bg-[#1a3144]': !lightStatus,
        'bg-yellow-200': lightStatus
    })
    const secondButtonStyles = clsx({
        'outline-2': true,
        'outline-[#222]': lightStatus,
        'outline-[#FAFAFA]': !lightStatus,
        'bg-slate-700': lightStatus,
        'bg-[#FAFAFA]': !lightStatus
    })
    const firstButtonStyles = clsx({
        'bg-[#FAFAFA]': lightStatus,
        'bg-[#B9CEE8]': !lightStatus
    })

    return (
        <main className={`${colorStyles} flex items-center justify-center p-7 transition-[background-color] duration-300 ease-in-out`}>
            <button className="group p-0.5" onClick={() => setLightStatus(prev => !prev)}>
                <div className={`h-32 w-16 ${firstButtonStyles} flex justify-center items-center rounded-t-4xl transition-[background-color] duration-300 ease-in-out`}>
                    {!lightStatus ? <Sun size={33} /> : <Moon size={33} />}
                </div>
                <div className={`h-32 w-16 transition-[transform, background-color, outline-color] duration-150 ease-in-out group-active:scale-90 ${secondButtonStyles} rounded-b-4xl`}></div>
            </button>
        </main>
    )
}

export default LightMain