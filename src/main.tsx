import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { StateSetter } from "./context/GlobalState.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StateSetter>
      <App />
    </StateSetter>
  </StrictMode>,
)
