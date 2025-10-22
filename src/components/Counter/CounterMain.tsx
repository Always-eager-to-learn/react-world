import { useState } from "react"
import { BadgePlus,OctagonMinus } from "lucide-react"

const CounterMain = () => {
    function performOperation(option: 'add' | 'subtract'){
        if(option === 'add')
            setCounterVal(prevVal => {
                const newValue = prevVal + 1
                return newValue
            })
        else if (option === 'subtract')
            setCounterVal(prevVal => {
                return prevVal - 1
            })
    }

    const [counterVal, setCounterVal] = useState(0)

    return (
        <main className="bg-[#385269] flex justify-center items-center gap-6 p-5">
            <button className="bg-rose-300 p-3.5 rounded-full cursor-pointer group hover:bg-[#051221] transition-[background-color, outline, outline-color, transform] duration-200 ease-in-out hover:outline-2 hover:outline-fuchsia-300 active:scale-95" onClick={() => performOperation('add')}>
                <BadgePlus size={33} className="stroke-[#051221] group-hover:stroke-rose-300 transition-[stroke] duration-150 ease-in group-active:scale-90" />
            </button>
            <p className="text-2xl text-[#FAFAFA]">{counterVal}</p>
            <button className="bg-[#411390] p-3.5 rounded-full cursor-pointer group hover:bg-[#FAFAFA] transition-[background-color, outline, outline-color] duration-200 ease-in-out hover:outline-2 hover:outline-cyan-300 active:scale-95" onClick={() => performOperation('subtract')}>
                <OctagonMinus size={33} className="stroke-[#FAFAFA] group-hover:stroke-[#411390] transition-[stroke] duration-150 ease-in group-active:scale-95"/>
            </button>
        </main>
    )
}

export default CounterMain