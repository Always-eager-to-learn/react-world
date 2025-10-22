import { Link } from "react-router-dom"
import { CircleArrowLeft, CircleUserRound } from "lucide-react"

const HeaderSearch = () => {
    return (
        <header className="p-4 bg-[#183760] grid grid-cols-3">
            <nav className="col-start-1">
                <ul className="flex gap-4 list-none items-center">
                    <li><Link to={'/'} className="flex gap-2.5 bg-purple-700 p-2.5 rounded-3xl group hover:bg-[#dfcefd] transition-[background-color] duration-200 ease-in-out">
                        <CircleArrowLeft size={20} className="stroke-[#f5f5f5] group-hover:stroke-[#2d0c0c] transition-[stroke] duration-150 ease-in" aria-hidden />
                        <p className="text-[hsl(0,0%,91%)] font-medium group-hover:text-[#2d0c0c] transition-[color] duration-150 ease-in">Back to Home</p>
                    </Link></li>
                    <li><Link to={'/searchapp'} className="text-[hsl(0,0%,91%)] text-xl font-medium">About</Link></li>
                    <li><Link to={'/searchapp'} className="text-[hsl(0,0%,91%)] text-xl font-medium">Store</Link></li>
                </ul>
            </nav>
            <section className="col-start-3 flex justify-end">
                <button className="flex gap-3 items-center cursor-pointer bg-purple-900 p-3 rounded-full hover:bg-blue-900 transition-[background-color] duration-400 ease-in-out">
                    <CircleUserRound size={25} className="stroke-[#f5f5f5]" aria-hidden/>
                    <p className="text-[#f5f5f5] text-xl font-medium font-sans">Preferences</p>
                </button>
            </section>
        </header>
    )
}

export default HeaderSearch