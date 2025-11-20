import { Outlet } from "react-router"
import CommonLayout from "./components/layout/ComonLayout"
import { genarateSidebar } from "./components/utlis/genarateSidebar"
import adminSidebarItem from "./Routes/adminSidebarItem"

function App() {

  // console.log(genarateSidebar(adminSidebarItem))
  return (
    <>
      <CommonLayout>
        <Outlet></Outlet>
      </CommonLayout>
    </>
  )
}

export default App
