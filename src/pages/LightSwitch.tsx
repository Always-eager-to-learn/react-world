import Header from "../components/Header"
import LightMain from "../components/LightSwitch/LightMain"

const LightSwitch = () => {
  return (
    <section className="h-dvh flex flex-col">
      <Header text="Light Experiment" backButton />
      <LightMain />
    </section>
  )
}

export default LightSwitch
