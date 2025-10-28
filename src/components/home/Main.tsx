import { items } from "../../data/homelinks"
import Entry from "./Entry"
import { memo } from "react"
import { nanoid } from "@sitnik/nanoid"

const Main = () => {
  const data = items
  const jsxElements = data.map((item) => {
    return (
      <Entry
        name={item.name}
        description={item.description}
        icon={item.icon}
        location={item.locationToGo}
        key={nanoid()}
        type={item.type}
      />
    )
  })

  return <>{jsxElements}</>
}

export default memo(Main)
