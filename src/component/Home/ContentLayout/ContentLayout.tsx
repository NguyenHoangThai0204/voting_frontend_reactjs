import { Route, Routes } from "react-router-dom"
import { ContentHome } from "../../Screens/ContentHome/ContentHome"
// import LoginForm from "../../LoginAndRegister/LoginFrom/LoginForm"


export const ContentLayout = () => {
  return (
    <div className="content">
    <Routes>
      <Route path="/home" element={<ContentHome />} />
    </Routes>
  </div>
  )
}
