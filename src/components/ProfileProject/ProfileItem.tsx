import clsx from "clsx"
import { Heart, UserRound } from "lucide-react"
import { useState } from "react"

interface Props{
    data: {name: string, jobDescription: string, availableforFreelance: boolean, notificationTimeFrame: string, willBeAvailableIn: string | null, extras: string[]}
    shouldShow: boolean
}

const ProfileItem = ({ data, shouldShow } : Props) => {
    const [isSaved, setIsSaved] = useState(false)
    const showItems = data.extras.map((element) => {
        return (
            <div className="sm:py-2 sm:px-3.5 max-sm:p-2 bg-[#EFD8B4] text-[#141315] rounded-2xl sm:text-lg max-sm:text-base self-center">{element}</div>
        )
    })
    const classNames = clsx({
        'item': true,
        'show': shouldShow
    })

    return (
        <section className={`col-start-1 row-start-1 bg-[#f4f4f4] sm:p-5  max-sm:p-3 rounded-3xl grid grid-cols-2 sm:gap-4 max-sm:gap-3 ${classNames}`}>
            <UserRound className="col-start-1 row-start-1 self-center" size={33} />
            <div className="col-start-2 justify-self-end">
                <button onClick={() => setIsSaved(prev => !prev)} className="flex gap-3.5 bg-[#767676] text-[#f4f4f4] py-2 px-4 rounded-2xl cursor-pointer hover:bg-[#cfcfcf] hover:text-[#464646] outline-2 outline-transparent hover:outline-[#266DD3] transition-[background-color, color, outline-color, transform] duration-250 ease-out active:scale-90 group">
                    {isSaved ? 'Saved' : 'Save'}
                    <Heart size={27} className={`${isSaved ? 'fill-[#c52020] group-hover:stroke-[#f4f4f4]' : 'fill-[#f4f4f4] group-hover:stroke-[#464646]'}`} />
                </button>
            </div>
          

            <section className="col-start-1 row-start-2 max-sm:col-span-2">
                <p className="text-lg"><span className="font-medium text-xl">Name:</span> {data.name}</p>
                <p className="text-base">{data.notificationTimeFrame}</p>
            </section>
            
            <section className="col-start-1 row-start-3 max-sm:col-span-2">
                <p className="font-medium text-xl">Job Description: </p>
                <p className="text-lg">{data.jobDescription}</p>
            </section>

            <section className="col-span-2 row-start-4 flex gap-2.5">
                {showItems}
            </section>
           
            <section className="col-start-2 sm:row-start-7 max-sm:row-start-5 sm:justify-self-center max-sm:col-span-2 max-sm:justify-self-end">
                {data.availableforFreelance ? 
                    <button className="bg-[#340768] text-[#f4f4f4] py-3 px-5 rounded-3xl cursor-pointer outline-2 outline-transparent transition-[outline-color, background-color, color, transform] duration-200 ease-out hover:bg-[#e6e6e6] hover:text-[#340768] hover:outline-[#5b07a9] active:scale-90">Hire {data.name}</button> : 
                    <section className="font-medium text-lg">
                        <p>Currently unavailable</p>
                        <p>Will be available in {data.willBeAvailableIn}</p>
                    </section>
                }
            </section>
        </section>
    )
}

export default ProfileItem