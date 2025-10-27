import ButtonDiv from "../ButtonDiv"

interface Props {
  stateSetterFunction: () => void
}

const CloseAside = ({ stateSetterFunction }: Props) => {
  return (
    <>
      <ButtonDiv design="open" onClickEvent={stateSetterFunction} />
      <aside>
        <ul>
          <li>Home</li>
        </ul>
      </aside>
    </>
  )
}

export default CloseAside
