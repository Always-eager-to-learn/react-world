import { Search, X } from "lucide-react"
import { useState } from "react"

const FormSearch = () => {
    function setInput(info : string){
        if(inputText === '')
            setShowClose(true)
        else if (info === '')
            setShowClose(false)
        setInputText(info)
    }

    function clearInput(){
        setInput('')
    }

    const [inputText, setInputText] = useState('')
    const [showClose, setShowClose] = useState(false)

    return (
        <form className="p-3.5 px-4 items-center has-focus-within:outline-2 has-focus-within:outline-[#FCFAF9] rounded-4xl bg-[#385269] grid grid-cols-[40px_1fr_40px]">
            <Search size={22} className="stroke-[#FCFAF9]"/>
            <input type="text" name="textField" className="text-[#FCFAF9] focus-within:outline-0 font-normal text-xl py-3 w-[450px]" value={inputText} onChange={(e) => setInput(e.target.value)} />
            {showClose ?
                <button onClick={clearInput} className="cursor-pointer justify-self-center group hover:bg-sky-300 transition-[background-color] duration-300 ease-in-out w-full flex justify-center">
                    <X size={22} className="stroke-[#FCFAF9] group-hover:stroke-[#1a3144] transition-[stroke] duration-200 ease-in"/>
                </button>
                : null 
            }
        </form>
    )
}

export default FormSearch