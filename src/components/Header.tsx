import clsx from "clsx"
import { Link } from "react-router-dom"
import { ChevronsLeft } from "lucide-react"

interface Props{
    text: string,
    backButton?: boolean
    home?: boolean
}

const Header = ({ text, backButton, home = false }: Props) => {
    const containerStyles = clsx({
        'flex': !backButton,
        'justify-center': !backButton,
        'grid': backButton,
        'grid-cols-[100px_1fr_1fr]': backButton,
        'bg-[#183760]': true,
        'py-3': true
    })

    const elementStyles = clsx({
        'col-start-2': backButton,
        'justify-self-center': backButton
    })

    return (
        <header className={`${containerStyles} ${home ? 'sticky top-0' : ''}`}>
            {backButton ?
                <div>
                    <Link to={'/'} className="bg-[#e9d6ff] flex items-center w-max sm:px-4 max-sm:px-2 py-2.5 rounded-full group hover:bg-[#4a4a4a] transition-[background-color] duration-200 ease-in-out">
                        <ChevronsLeft size={20} className="stroke-[#484848] group-hover:stroke-[#d4afff] transition-[stroke] duration-150 ease-in" />
                        <p className="text-[#484848] group-hover:text-[#d4afff] transition-[color] duration-150 ease-in">Back</p>
                    </Link>
                </div>
                : null
            }
            <h1 className={`text-[#ecbab5] text-3xl font-medium hover:text-[#FFFCFF] ${elementStyles} col-span-2 text-center`}>{text}</h1>
        </header>
    )
}

export default Header