import { useState } from "react"
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react"
import NavigationButton from "./NavigationButton";

interface Props {
    data: {
        images: { location: string, altText: string, key: string }[];
        beforeValue: string | null,
        afterValue: string | null
    }
    firstLocation: number
    searchParams: (nameValue: string) => void
}

const GalleryInfo = ({ data, firstLocation, searchParams }: Props) => {
    function changeImage(direction: 'left' | 'right') {
        if ((indexToShow < (data.images.length - 1) && direction === 'right') || (indexToShow > 0 && direction === 'left')) {
            setIndexToShow(prevIndex => {
                return direction === 'left' ? prevIndex - 1 : prevIndex + 1
            })
        } else {
            setIndexToShow(prevIndex => prevIndex)
        }
    }
    
    const [indexToShow, setIndexToShow] = useState(firstLocation)
    const totalIndex = data.images.length
    const listImages = data.images.map((image, index) => {
        const condition = indexToShow === index
        return (
            <li className={`grid-image gap-2.5`}>
                <img src={image.location} alt={image.altText} key={image.key} loading="lazy" className={`image ${condition ? 'show' : null}`} />
            </li>
        )
    })

    return (
        <section className="grid grid-cols-[200px_1fr_200px]">
            <ul className="col-start-2 grid">{listImages}</ul>
            <h3 className={`text-xl text-[#FAFAFA] row-start-1 col-start-1 justify-self-center self-center`}>Image {indexToShow + 1} / {totalIndex}</h3>

            <button className="bg-[#FAFAFA] rounded-full p-2.5 cursor-pointer group hover:bg-[#353535] transition-[background-color, transform] duration-200 ease-out active:scale-90 col-start-1 row-start-1 self-start justify-self-center w-24 flex justify-center" onClick={() => changeImage('left')}>
                <ChevronLeftCircle size={30} className="group-hover:stroke-[#FAFAFA] transition-[stroke] duration-200 ease-in-out" />
            </button>

            <button className="bg-[#FAFAFA] rounded-full p-2.5 cursor-pointer group hover:bg-[#353535] transition-[background-color, transform] duration-200 ease-out active:scale-90 col-start-3 row-start-1 self-start justify-self-center w-24 flex justify-center" onClick={() => changeImage('right')}>
                <ChevronRightCircle size={30} className="group-hover:stroke-[#FAFAFA] transition-[stroke] duration-200 ease-in-out" />
            </button>

            <NavigationButton text={data.beforeValue} icon="chevron-left" direction="prev" columnPosition="col-start-1" functionOnClick={searchParams} stateSetterFunction={() => setIndexToShow(0)}/>
            <NavigationButton text={data.afterValue} icon="chevron-right" direction="next" columnPosition="col-start-3" functionOnClick={searchParams} stateSetterFunction={() => setIndexToShow(0)} />
        </section>
    )
}

export default GalleryInfo