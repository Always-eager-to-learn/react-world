import { RouterProvider } from "react-router-dom"
import { createRoutes } from "./routes"
import AsideStateSet from "./context/GlobalState"

function App() {
  const routes = createRoutes()

  return (
    <AsideStateSet>
      <RouterProvider router={routes} />
    </AsideStateSet>
  )
}

export default App
