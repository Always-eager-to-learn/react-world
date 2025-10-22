import HeaderSearch from "../components/SearchApp/HeaderSearch"
import MainSearch from "../components/SearchApp/MainSearch"

const SearchApp = () => {
    return(
        <>
            <HeaderSearch />
            <MainSearch />
            <footer className="flex gap-3 justify-between p-4 bg-[#26446c]">
                <p className="text-[#f5f5f5]">(this is a testing website)</p>
                <p className="text-[#f5f5f5]">Made with ❤️ using <a href="https://tailwindcss.com/" target="_blank" className="underline underline-offset-4 font-medium">TailwindCSS</a></p>
                <p className="text-[#f5f5f5]">Created and Maintained by CO.</p>
            </footer>
        </>
    )
}

export default SearchApp