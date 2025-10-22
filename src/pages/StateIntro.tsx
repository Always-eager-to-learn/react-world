import { useState } from "react"
import Header from "../components/Header"
import Button from "../components/StateIntro/Button"

const StateIntro = () => {
    const [message, setMessage] = useState('Initial Message')
    const Buttons = [
        {
            text: 'Text One',
            bgcolor: 'bg-purple-900',
            textcolor: 'text-[#FAFAFA]',
            hoverBgColor: 'bg-[#FAFAFA]',
            hoverTextcolor: 'text-purple-900',
            onclick: () => setMessage('First Message')
        },
        {
            text: 'Text Two',
            bgcolor: 'bg-yellow-300',
            textcolor: 'text-[#070C0C]',
            hoverBgColor: 'bg-[#37374B]',
            hoverTextcolor: 'text-yellow-300',
            onclick: () => setMessage('Second Message')
        },
        {
            text: 'Text Three',
            bgcolor: 'bg-emerald-400',
            textcolor: 'text-[#070C0C]',
            hoverBgColor: 'bg-[#37374B]',
            hoverTextcolor: 'text-emerald-400',
            onclick: () => setMessage('Third Message')
        },
        {
            text: 'Text Four',
            bgcolor: 'bg-fuchsia-300',
            textcolor: 'text-[#070C0C]',
            hoverBgColor: 'bg-[#37374B]',
            hoverTextcolor: 'text-fuchsia-300',
            onclick: () => setMessage('Fourth Message')
        },
        {
            text: 'Initial Message',
            bgcolor: 'bg-indigo-800',
            textcolor: 'text-[#FAFAFA]',
            hoverBgColor: 'bg-[#FAFAFA]',
            hoverTextcolor: 'text-indigo-800',
            onclick: () => setMessage('Initial Message')
        }
    ]

    const jsxElements = Buttons.map((element) => {
        return <Button text={element.text} bgColor={element.bgcolor} textColor={element.textcolor} onclick={element.onclick} hoverBgColor={element.hoverBgColor} hoverTextColor={element.hoverTextcolor} />
    })

    return (
        <>
            <Header text="State Introduction" backButton />
            <main className="flex flex-col bg-[#1a3144] gap-5 p-10 h-96 items-center justify-center">
                <p className="text-[#f7f4f4] text-3xl">{message}</p>
                <section className="md:flex gap-4 max-md:grid grid-cols-2">
                    {jsxElements}
                </section>
            </main>
        </>
    )
}

export default StateIntro