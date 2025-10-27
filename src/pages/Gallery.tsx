import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import GalleryInfo from "../components/ImageGallery/GalleryInfo";
import { checkType, getImagesInfo } from "../data/ImagesInfo";
import { toTitleCase } from "../scripts/Character";
import { useEffect, useState } from "react";
import type { ImageResult } from "../types/ImageType";

const Gallery = () => {
  function setSearchParam(nameValue: string) {
    setSearchParams((prevParams) => {
      prevParams.set("name", nameValue);
      return prevParams;
    });
  }

  const [searchparams, setSearchParams] = useSearchParams();
  const [randIndex, setRandIndex] = useState<number>(0);
  const [images, setImages] = useState<ImageResult | null>(null);
  const [imagesLoading, setImagesLoading] = useState(false);

  const searchValue = searchparams.get("name");
  const isSearchValueValid = checkType(searchValue);
  const nameValue = isSearchValueValid ? searchValue : "dogs";

  useEffect(() => {
    async function getImages() {
      setImagesLoading(true);
      setImages(null);
      const images = await getImagesInfo({ categoryName: nameValue });
      setRandIndex(Math.floor(Math.random() * images.images.length));
      setTimeout(() => {
        setImages(images);
        setImagesLoading(false);
      }, 150);
    }

    getImages();
  }, [nameValue]);

  return (
    <section className="h-dvh flex flex-col">
      <Header text={`Image Gallery (${toTitleCase(nameValue)})`} backButton />
      <main className="bg-[#1a3144] p-4 grow">
        <GalleryInfo
          data={images}
          firstLocation={randIndex}
          searchParams={setSearchParam}
          loading={imagesLoading}
        />
      </main>
    </section>
  );
};

export default Gallery;
