import { items } from "../../data/homelinks"
import Entry from "./Entry"
import { memo } from "react"

const Main = () => {
  const data = items
  const jsxElements = data.map((item, id) => {
    return (
      <Entry
        name={item.name}
        description={item.description}
        icon={item.icon}
        location={item.locationToGo}
        key={id}
      />
    )
  })

  return (
    <main className="row-start-2 col-start-2 grid gap-4.5 bg-[#1a3144] py-3.5 px-2 grid-column auto-rows-max overflow-y-scroll">
      {jsxElements}
    </main>
  )
}

export default memo(Main)
