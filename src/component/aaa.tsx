// import { FooterHome } from "../FooterHome/FooterHome";
import { HeaderHomeLayout } from "../HeaderHome/HeaderHomeLayout/HeaderHomeLayout";
import { MenuLayout } from "../Menu/MenuLayout";
// import { ContentLayout } from "../ContentLayout/ContentLayout"; // Thay đổi đường dẫn nếu cần
import "./HomeLayout.css";
import { ContentHome } from "../../Screens/ContentHome/ContentHome";

export const HomeLayout = () => {
  return (
    <div className="home_layout">
      <div className="header_home">
        <HeaderHomeLayout />
      </div>
      <div className="content_home">
        <div className="menu_left">
          <MenuLayout />
        </div>
        <div className="content_right">
          <ContentHome />
        </div>
      </div>
      {/* <div className="footer_home">
        <FooterHome />
      </div> */}
    </div>
  );
};
