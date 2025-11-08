import { useState, type JSX } from "react"
import Header from "../components/Header"
import { ColorRing } from "react-loader-spinner"

const Tasks = () => {
  const [tasks] = useState<Document[]>([])
  // const init = async () => {
  //   const responses = await dbFunctions.tasks.list()
  //   setTasks(responses.rows)
  // }

  const jsxElements: JSX.Element[] = []

  // if (tasks) {
  //   tasks.map((note) => {
  //     // jsxElements.push(<p key={note.$id}>{note.task}</p>)
  //   })
  // }

  // useEffect(() => {
  //   init()
  // }, [])

  return (
    <section className="h-dvh flex flex-col">
      <Header text="To-Do App" backButton />
      <main className="grow">
        {tasks.length !== 0 ? jsxElements : <ColorRing />}
      </main>
    </section>
  )
}

export default Tasks
