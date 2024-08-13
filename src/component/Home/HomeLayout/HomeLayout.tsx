import { HeaderHomeLayout } from "../HeaderHome/HeaderHomeLayout/HeaderHomeLayout";
import { MenuLayout } from "../Menu/MenuLayout";
import "./HomeLayout.css";
import { ContentLayout } from "../ContentLayout/ContentLayout";

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
          <ContentLayout />
        </div>
      </div>
    </div>
  );
};
