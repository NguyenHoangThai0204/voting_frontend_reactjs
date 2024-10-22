import React from "react";
import { HeaderHomeLayout } from "../HeaderHome/HeaderHomeLayout/HeaderHomeLayout";
import { MenuLayout } from "../Menu/MenuLayout";
import "./HomeLayout.css";
import { ContentLayout } from "../ContentLayoutUser/ContentLayoutUser";
import { FooterHome } from "../FooterHome/FooterHome";
import { AuthContext } from "../../../contextapi/AuthContext";
import ContentTabsAdmin from "../../Admin/ContentTabsAdmin/ContentTabsAdmin";


export const HomeLayout = () => {

  const authContext = React.useContext(AuthContext);
  if (!authContext) {
    return <p>Loading...</p>;
  }
  const { user } = authContext;


  return (
    <div className="home_layout">
      <header className="header_home">
        <HeaderHomeLayout />
      </header>
      {
        user && user.role === "admin"
          ? (
            <div className="contentTabsAdmin" style={{height:"100vh"}}>
              <ContentTabsAdmin />  
            </div>
          ) : (
            <main className="content_home">
              <div className="body_home">
                <aside className="menu_left">
                  <MenuLayout />
                </aside>
                <section className="content_right">
                  <ContentLayout />
                </section>
              </div>
            </main>
          )
      }
      <footer className="footer_home">
        <FooterHome />
      </footer>

    </div>
  );
  // return (
  //   <div className="home_layout">
  //     <header className="header_home">
  //       <HeaderHomeLayout />
  //     </header>
  //     {
  //       user && user.role === "admin"
  //         ? (
  //           <ContentTabsAdmin />
  //         ) : (
  //           <ContentTabsAdmin />

  //         )
  //     }

  //   </div>
  // );
};
