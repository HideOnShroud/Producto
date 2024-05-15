import { RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import router from "./router"


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
