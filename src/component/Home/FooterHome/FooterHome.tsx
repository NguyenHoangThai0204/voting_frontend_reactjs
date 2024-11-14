import React from "react";
import "./FooterHome.css";

export const FooterHome = () => {
  return (
    <footer className="content_footer_home">
      <div className="ft_container">
        <div className="mgt lienhe">
          <h2>Call Us</h2>
          <br />
          <a href="tel:+63456789123">+6-345-6789-123</a>
          <br />
          <br />
          <h2>Email</h2>
          <br />
          <a href="mailto:dot048209@gmail.com">dot048209@gmail.com</a>
        </div>
        <div className="mgt aboutus">
          <h2>About Us</h2>
          <br />
          <a href="#">Our story</a>
          <br />
          <br />
          <a href="#">Working With Us</a>
          <br />
          <br />
          <a href="#">Be Our Partner</a>
        </div>
        <div className="mgt sup">
          <h2>Support</h2>
          <br />
          <a href="#">Customer Support</a>
          <br />
          <br />
          <a href="#">Privacy & Policy</a>
          <br />
          <br />
          <a href="#">Contact Channels</a>
        </div>
        <div className="mgt members">
          <h2>Members</h2>
          <br />
          <address style={{ color: "white" }}>
            20005501 - Lê Thị Ngọc Mai
            <br />
            <br />
            20009931 - Nguyễn Hoàng Thái
            <br />
            <br />
            <div className="icon">
              <a href="https://www.facebook.com/">
                <i className="ti-facebook"></i>
              </a>
              <a href="https://twitter.com/">
                <i className="ti-twitter-alt"></i>
              </a>
              <a href="https://www.instagram.com/">
                <i className="ti-instagram"></i>
              </a>
              <a href="https://www.youtube.com/">
                <i className="ti-youtube"></i>
              </a>
            </div>
          </address>
        </div>
      </div>
    </footer>
  );
};
