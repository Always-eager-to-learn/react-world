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

  return <>{jsxElements}</>
}

export default memo(Main)
