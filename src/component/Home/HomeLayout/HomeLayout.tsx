
import { ContentHome } from "../../Screens/ContentHome/ContentHome"
import { MenuLayout } from "../Menu/MenuLayout"
import "./HomeLayout.css"

export const HomeLayout = () => {
  return (
    <div className="home_layout">
      <div className="menu_left">
        <MenuLayout />
      </div>
      <div className="content_right">
        <ContentHome />
      </div>
    </div>
  )
}
