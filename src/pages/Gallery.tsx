import { useSearchParams } from "react-router-dom"
import Header from "../components/Header"
import GalleryInfo from "../components/ImageGallery/GalleryInfo"
import { checkType, getImagesDetails } from "../data/ImagesInfo"
import { toTitleCase } from "../scripts/Character"

const Gallery = () => {

    function setSearchParam(nameValue: string){
        setSearchParams(prevParams => {
            prevParams.set('name', nameValue)
            return prevParams
        })
    }

    const [searchparams, setSearchParams] = useSearchParams()
    const searchValue = searchparams.get('name')
    const isSearchValueValid = checkType(searchValue)
    const nameValue = isSearchValueValid ? searchValue : 'dogs'
    const image = getImagesDetails({ name: nameValue  })
    const randIndex = Math.floor(Math.random() * image.images.length)
    
    return (
        <>
            <Header text={`Image Gallery (${toTitleCase(nameValue)})`} backButton />
            <main className="bg-[#1a3144] p-4">
                <GalleryInfo data={image} firstLocation={randIndex} searchParams={setSearchParam}/>
            </main>
        </>
    )
}

export default Gallery