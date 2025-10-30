import { Outlet } from "react-router"
import CommonLayout from "./components/layout/ComonLayout"

function App() {

  return (
    <>
      <CommonLayout>
        <Outlet></Outlet>
      </CommonLayout>
    </>
  )
}

export default App
