import { items } from "../../data/homelinks"
import Entry from "./Entry"

const Main = () => {
    const data = items
    const jsxElements = data.map((item, id) => {
        return  (
            <Entry name={item.name} description={item.description} icon={item.icon} location={item.locationToGo} key={id} />
        )
    })

    return (
        <main className="grid gap-4.5 bg-[#1a3144] py-3.5 px-2 grid-column">
            {jsxElements}
        </main>
    )
}

export default Main