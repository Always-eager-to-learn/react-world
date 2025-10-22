import { RouterProvider } from 'react-router-dom'
import { createRoutes } from './routes'

function App() {
  const routes = createRoutes()

  return (
    <RouterProvider router={routes} />
  )
}

export default App
