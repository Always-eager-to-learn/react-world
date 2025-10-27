import ButtonDiv from "../ButtonDiv"
import { Link } from "react-router-dom"

interface Props {
  stateSetterFunction: () => void
}

const OpenAside = ({ stateSetterFunction }: Props) => {
  return (
    <>
      <ButtonDiv design="close" onClickEvent={stateSetterFunction} />
      <aside>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
        </ul>
      </aside>
    </>
  )
}

export default OpenAside
