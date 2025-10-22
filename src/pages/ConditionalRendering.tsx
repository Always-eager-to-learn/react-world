import { useState } from "react"
import IconSection from "../components/ConditionalRendering/IconSection"
import Header from "../components/Header"

const ConditionalRendering = () => {

    function changeState(number: number){
        const location = number as keyof typeof iconState

        setIconState(prev => {
            return {...prev, [number]: !prev[location]}
        })
    }

    function changeColor(){
        const randLocation = Math.floor(Math.random() * backgroundColors.length)
        setColor([backgroundColors[randLocation], foregroundColors[randLocation]])
    }

    const [iconState, setIconState] = useState({1: true, 2: false})
    const backgroundColors = ['bg-red-300', 'bg-amber-400', 'bg-teal-300', 'bg-indigo-800', 'bg-rose-200']
    const foregroundColors = ['text-[#061321]', 'text-[#061321]', 'text-[#061321]','text-[#F5F5F5]', 'text-[#081421]']
    const [color, setColor] = useState([backgroundColors[0], foregroundColors[0]])

    return (
        <>
            <Header text="Conditional Rendering" backButton />
            <main className="bg-[#1a3144] flex flex-col gap-5 items-center p-5">
                <IconSection text={`${iconState[1] ? 'Hide Hidden Icon' : 'Show Hidden Icon'}`} backgroundDesign="white" iconName="dice-6" displayStatus={iconState[1]} onClick={() => changeState(1)}/>
                
                <button className={`p-5 text-xl ${color[0]} ${color[1]} cursor-pointer rounded-3xl hover:outline-2 hover:outline-[#F5F5F5] transition-[outline, background-color, color] duration-350 ease-in-out active:scale-95`} onClick={changeColor}>
                    Click to Change Color
                </button>
                <IconSection text={`${iconState[2] ? 'Hide Visible Icon' : 'Show Visible Icon'}`} backgroundDesign="purple" iconName="brick-wall-fire" displayStatus={iconState[2]} onClick={() => changeState(2)}/>
            </main>
        </>
    )
}

export default ConditionalRendering