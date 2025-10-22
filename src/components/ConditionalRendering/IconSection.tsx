import { DynamicIcon, type IconName } from "lucide-react/dynamic"
import clsx from "clsx"

interface Props {
    text: string,
    backgroundDesign: 'white' | 'purple',
    iconName: IconName,
    onClick: () => void,
    displayStatus: boolean
}

const IconSection = ({text, backgroundDesign, iconName, onClick, displayStatus} : Props) => {
    const styles = clsx({
        'animating-element': true,
        'animate': displayStatus
    })
    const buttonStyles = clsx({
        'animating-button': true,
        'animate-down': displayStatus
    })
    const sectionStyles = clsx({
        'bg-[#FAFAFA]': backgroundDesign === 'white',
        'bg-[#3a1951]': backgroundDesign === 'purple',
        'outline-orange-500': backgroundDesign === 'white',
        'outline-fuchsia-200': backgroundDesign === 'purple',
    })

    return (
        <section className={`${sectionStyles} p-5 flex flex-col items-center gap-5 rounded-3xl outline-2 `}>
            <div className={styles}>
                <DynamicIcon name={iconName} className={`${backgroundDesign === 'purple' ? 'stroke-[#FAFAFA]' : 'stroke-[#OC1736]'}`} size={30}/>
            </div>
            <button className={`p-4 bg-amber-300 text-[#0C1F36] rounded-full cursor-pointer hover:bg-[#0C1F36] hover:text-amber-100 hover:outline-2 hover:outline-sky-700 ${buttonStyles} active:scale-95`} onClick={onClick}>
                <p className="text-xl">{text}</p>
            </button>
        </section>
    )
}

export default IconSection