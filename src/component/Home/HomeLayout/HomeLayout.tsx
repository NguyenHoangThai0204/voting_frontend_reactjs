import { HeaderHomeLayout } from "../HeaderHome/HeaderHomeLayout/HeaderHomeLayout";
import { MenuLayout } from "../Menu/MenuLayout";
import "./HomeLayout.css";
import { ContentLayout } from "../ContentLayout/ContentLayout";
import { FooterHome } from "../FooterHome/FooterHome";

export const HomeLayout = () => {


  return (
    <div className="home_layout">
      <header className="header_home">
        <HeaderHomeLayout />
      </header>
      <main className="content_home">
        <div className="body_home">

          <aside className="menu_left">
            <MenuLayout />
          </aside>

          <section className="content_right">
            <ContentLayout />
          </section>
        </div>
        <footer className="footer_home">
          <FooterHome />
        </footer>
      </main>
    </div>
  );
};
