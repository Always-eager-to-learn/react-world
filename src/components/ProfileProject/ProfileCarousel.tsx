import { useState } from "react"
import { profiles } from "../../data/profileinfo"
import ProfileItem from "./ProfileItem"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { nanoid } from "@sitnik/nanoid"

const ProfileCarouselDetails = () => {
  function moveAround(direction: "left" | "right") {
    setShowIndex((prev) => {
      let newIndex = prev
      if (direction === "left" && prev > 0) newIndex--
      else if (direction === "right" && prev < profiles.length - 1) newIndex++
      return newIndex
    })
  }

  const [showIndex, setShowIndex] = useState(0)
  const jsxElements = profiles.map((element, index) => {
    const toShow = showIndex === index
    return <ProfileItem data={element} shouldShow={toShow} key={nanoid()} />
  })

  return (
    <section className="grid lg:grid-cols-[100px_1fr_100px] gap-3.5 md:grid-cols-1">
      <button
        className={`${showIndex === 0 ? "opacity-0" : "opacity-100"} max-lg:col-start-1 max-md:row-start-2  max-md:justify-self-start bg-[#212121] text-[#f4f4f4] justify-self-center self-center md:p-4 max-md:p-2.5 rounded-full flex justify-center cursor-pointer hover:bg-[#F4F4F4] hover:text-[#212121] transition-[background-color, color, outline-color, transform, opacity] duration-200 ease-out active:scale-90`}
        onClick={() => moveAround("left")}
      >
        <ChevronLeft size={30} />
      </button>

      <section className="max-lg:col-start-2 max-md:col-start-1 max-md:row-start-1 grid">
        {jsxElements}
      </section>

      <button
        className={`${showIndex === profiles.length - 1 ? "opacity-0" : "opacity-100"} max-lg:col-start-3 max-md:col-start-1 max-md:row-start-2 max-md:justify-self-end bg-[#212121] text-[#f4f4f4] justify-self-center self-center md:p-4 max-md:p-2.5 rounded-full flex justify-center cursor-pointer hover:bg-[#F4F4F4] hover:text-[#212121] transition-[background-color, color, outline-color, transform, opacity] duration-200 ease-out active:scale-90`}
        onClick={() => moveAround("right")}
      >
        <ChevronRight size={30} />
      </button>
    </section>
  )
}

export default ProfileCarouselDetails
