import { DynamicIcon, type IconName } from "lucide-react/dynamic"
import { ArrowRightToLine } from 'lucide-react'
import { Link } from "react-router-dom"

interface Props {
    name: string,
    description: string,
    icon: IconName,
    location: string
}

const Entry = ({ name, description, icon, location } : Props) => {
    return (
        <section className="bg-[#385269] rounded-2xl flex flex-col p-4 gap-3.5 items-start">
            <div className="flex gap-3.5">
                <DynamicIcon name={icon} size={38} className="stroke-[#EF959C]" />

                <section>
                    <h3 className="text-[#FCFAF9] text-2xl">{name}</h3>
                    <p className="text-[#FCFAF9]">{description}</p>
                </section>
            </div>
            
            <div className="self-end">
                <Link to={location} className="text-[#FCFAF9] flex gap-2.5 bg-[#FFD9CE] px-5 py-2 rounded-full items-center group hover:bg-[#77569f] hover:outline-[2px] hover:outline-[#ffd9cee5] hover:outline-solid hover:outline-offset-[2px] transition-[background-color] duration-300 ease-in">
                    <p className="text-[#472077] group-hover:text-[#FFD9CE] group-hover:font-medium transition-[color] duration-300 ease-in-out">Visit the design</p>
                    <ArrowRightToLine size={22} className="stroke-[#472077] group-hover:stroke-[#ffd9ce] transition-[stroke] duration-200 ease-in"/>
                </Link>
            </div>
        </section>
    )
}

export default Entry