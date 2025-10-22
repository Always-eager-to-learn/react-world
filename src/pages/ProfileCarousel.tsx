import { useSearchParams } from "react-router-dom"
import Header from "../components/Header"
import MainSection from "../components/ProfileProject/MainSection"

const ProfileCarousel = () => {
    function changeParams(value: string){
        setSearchParam(prevParm => {
           prevParm.set('view', value)
           return prevParm
        })
    }

    const [searchParam, setSearchParam] = useSearchParams()
    const viewValue = searchParam.get('view')

    return (
        <>
            <Header text="Profile Carousel" backButton />
            {viewValue !== null ?
                <MainSection viewState={viewValue} onClick={changeParams}/> : null
            }
        </>
    )
}

export default ProfileCarousel