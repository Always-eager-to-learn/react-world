import Header from "../components/Header"
import Main from "../components/home/Main"
import Aside from "../components/home/Aside"
import { useState } from "react"

const Home = () => {
  function changeStatus(value: boolean) {
    setLeftAsideOpen(value)
  }
  const [leftAsideOpen, setLeftAsideOpen] = useState(true)
  return (
    <section
      className={`grid ${leftAsideOpen ? "grid-cols-[1.3fr_6fr]" : "grid-cols-[0.3fr_6fr]"} grid-rows-[auto_1fr] h-dvh transition-[grid-template-columns] duration-300 ease-in-out`}
    >
      <section className="col-span-2">
        <Header text="React World" home />
      </section>
      <Aside isExpanded={leftAsideOpen} stateSetterFunction={changeStatus} />
      <Main />
    </section>
  )
}

export default Home
