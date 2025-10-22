import CounterMain from "../components/Counter/CounterMain"
import Header from "../components/Header"

const Counter = () => {
    return (
        <>
            <Header text="Counter Exercise" backButton />
            <CounterMain />
        </>
    )
}

export default Counter