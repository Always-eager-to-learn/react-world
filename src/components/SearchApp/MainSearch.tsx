import FormSearch from "./FormSearch"

const MainSearch = () => {
    return (
        <main className="bg-[#1a3144] h-[80dvh]">
            <section className="flex flex-col flex-2 items-center justify-center gap-10 p-5">
                <section className="flex flex-col gap-3.5 items-center">
                    <p className="text-[#FCFAF9] text-4xl">Search App</p>
                    <p className="text-[#FCFAF9] text-2xl">Time to find out the answers you have been waiting eagerly for</p>
                </section>
               
                <FormSearch />

                <section className="flex gap-5">
                    <button className="p-4 rounded-2xl bg-sky-700 text-[#fdf0ec] hover:bg-[hsl(223,54%,82%)] hover:text-[#03172d] text-xl transition-[background-color, color] duration-150 ease-in cursor-pointer">Search for Info</button>
                    <button className="p-4 rounded-2xl bg-sky-700 text-[#fdf0ec] hover:bg-[hsl(223,55%,80%)] hover:text-[#03172d] text-xl transition-[background-color, color] duration-150 ease-in cursor-pointer">Image Search</button>
                </section>
            </section>
        </main>
    )
}

export default MainSearch