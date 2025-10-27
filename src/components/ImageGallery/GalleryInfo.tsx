import { useState } from "react";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import NavigationButton from "./NavigationButton";
import type { ImageResult } from "../../types/ImageType";
import { CirclesWithBar } from "react-loader-spinner";
import clsx from "clsx";

interface Props {
  data: ImageResult | null;
  firstLocation: number;
  searchParams: (nameValue: string) => void;
  loading: boolean;
}

const GalleryInfo = ({ data, firstLocation, searchParams, loading }: Props) => {
  function changeImage(direction: "left" | "right") {
    if (!loading && data) {
      if (
        (indexToShow < data.images.length - 1 && direction === "right") ||
        (indexToShow > 0 && direction === "left")
      ) {
        setIndexToShow((prevIndex) => {
          return direction === "left" ? prevIndex - 1 : prevIndex + 1;
        });
      } else {
        setIndexToShow((prevIndex) => prevIndex);
      }
    }
  }

  const [indexToShow, setIndexToShow] = useState(firstLocation);

  let totalIndex: number | null = null;
  let listImages;
  if (data) {
    totalIndex = data.images.length;
    listImages = data.images.map((image, index) => {
      const condition = indexToShow === index;
      return (
        <li className={`grid-image`} key={image.key}>
          <img
            src={image.desktop}
            alt={image.altText}
            loading="lazy"
            className={`image ${condition ? "show" : null} aspect-square h-full`}
          />
        </li>
      );
    });
  }
  const loadingSectionStyles = clsx({
    normal: true,
    show: loading,
  });
  const otherSectionShowStyles = clsx({
    normal: true,
    show: !loading,
  });

  return (
    <section className="grid grid-cols-[1fr_3fr_1fr] h-full">
      <ul
        className={`col-start-2 md:row-start-1 max-md:row-start-1 max-md:row-end-3 grid ${otherSectionShowStyles}`}
      >
        {listImages}
      </ul>
      <section
        className={`col-start-2 p-4 row-start-1 row-end-3 justify-self-center flex flex-col gap-5 justify-center items-center text-xl text-[#fafafa] font-medium ${loadingSectionStyles}`}
      >
        {loading ? (
          <>
            <CirclesWithBar color="#FDF0D5" barColor="#fafafa" />
            <h3>Loading Images...</h3>
          </>
        ) : null}
      </section>
      <h3
        className={`text-xl text-[#FAFAFA] col-start-1 row-start-1 justify-self-center self-center ${otherSectionShowStyles}`}
      >
        {!loading ? ` Image ${indexToShow + 1} / ${totalIndex}` : null}
      </h3>

      <button
        className="bg-[#FAFAFA] rounded-full p-2.5 cursor-pointer group hover:bg-[#353535] transition-[background-color, transform] duration-200 ease-out active:scale-90 col-start-1 row-start-1 self-start justify-self-center sm:w-24 flex justify-center"
        onClick={() => changeImage("left")}
      >
        <ChevronLeftCircle
          size={30}
          className="group-hover:stroke-[#FAFAFA] transition-[stroke] duration-200 ease-in-out"
        />
      </button>

      <button
        className="bg-[#FAFAFA] rounded-full p-2.5 cursor-pointer group hover:bg-[#353535] transition-[background-color, transform] duration-200 ease-out active:scale-90 col-start-3 row-start-1 self-start justify-self-center sm:w-24 flex justify-center"
        onClick={() => changeImage("right")}
      >
        <ChevronRightCircle
          size={30}
          className="group-hover:stroke-[#FAFAFA] transition-[stroke] duration-200 ease-in-out"
        />
      </button>

      <NavigationButton
        text={data?.beforeIndex}
        icon="chevron-left"
        direction="prev"
        columnPosition="col-start-1"
        functionOnClick={searchParams}
        stateSetterFunction={() => setIndexToShow(0)}
      />
      <NavigationButton
        text={data?.afterIndex}
        icon="chevron-right"
        direction="next"
        columnPosition="col-start-3"
        functionOnClick={searchParams}
        stateSetterFunction={() => setIndexToShow(0)}
      />
    </section>
  );
};

export default GalleryInfo;
