import {createBrowserRouter, RouterProvider} from "react-router-dom"
import RootLayout from "./pages/Root"
import Signup from "./pages/Signup";
import "./index.css"
import { signUpAction } from "./pages/action";


 const App = () => {

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [{
      index: true,
      element: <Signup/>,
      action: signUpAction
    }]
  }
])

  return (
<div className="bg-linear-to-br from-slate-950 via-slate-900 to-violet-950 font-primary">
  <RouterProvider router={router} />
</div>
  )
}

export default App
