import { Route, Routes } from "react-router-dom"
import { ContentHome } from "../../Screens/ContentHome/ContentHome"


export const ContentLayout = () => {
  return (
    <div className="content">
    <Routes>
      <Route path="/home" element={<ContentHome />} />
    </Routes>
  </div>
  )
}
