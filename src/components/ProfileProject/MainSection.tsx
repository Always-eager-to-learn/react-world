import { GalleryHorizontal, LayoutGrid } from "lucide-react"
import ProfileCarouselDetails from "./ProfileCarousel"

interface Props{
    viewState: string
    onClick: (value: string) => void
}

const MainSection = ({ viewState, onClick }: Props) => {
    const isCarouselSelected = viewState === 'carousel'
    return (
        <main className="bg-[#1a3144] p-4 flex flex-col items-center gap-8">
            {isCarouselSelected ? <ProfileCarouselDetails /> : null}
            
            <section className="flex gap-5 justify-self-end">
                <button className={`p-4 rounded-4xl flex items-center gap-3.5 cursor-pointer outline-2 ${isCarouselSelected ? 'bg-[#FDF0D5] outline-[#788BFF] hover:text-[#FDF0D5]' : 'bg-[#BFD7EA] hover:outline-fuchsia-300 hover:text-[#BDF7EA] outline-transparent'} hover:bg-[#0f233d] transition-[background-color, color, outline, transform] duration-300 ease-out active:scale-95 hover:-translate-y-0.5`} onClick={() => onClick('carousel')}>
                    <p className="md:text-xl max-md:text-lg">Carousel View</p>
                    <GalleryHorizontal size={30} />
                </button>

                <button className={`p-4 rounded-4xl flex gap-3.5 items-center cursor-pointer outline-2 ${isCarouselSelected ? 'bg-[#BFD7EA] hover:text-[#BDF7EA] outline-transparent hover:outline-fuchsia-300' : 'bg-[#FDF0D5] hover:text-[#FDF0D5] outline-[#788BFF]'} hover:bg-[#0f233d] transition-[background-color, color, outline, outline-color, transform] duration-300 ease-out active:scale-95 hover:-translate-y-0.5`} onClick={() => onClick('grid')}>
                    <p className="md:text-xl max-md:text-lg">Grid View</p>
                    <LayoutGrid size={30} />
                </button>
            </section>

        </main>
    )
}

export default MainSection