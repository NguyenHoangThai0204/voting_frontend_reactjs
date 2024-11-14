import "./FooterHome.css";
import React from "react";
export const FooterHome = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <div className="footer-section about logo">
          <img
            src="/src/assets/logoMT.png"
            alt="T&M Logo"
            className="footer-logo"
          />
          <h2>T&M COMPANY</h2>
          </div>
          <h3>Liên hệ</h3>
          <p>Điện thoại: +84 858 594 707</p>
          <p>Email: tmcompany@gmail.com</p>
          <p>
            Địa chỉ: 49 Nguyễn Văn Bảo, phường 4, quận Gò Vấp, tp. Hồ Chí Minh.
          </p>
          
        </div>
        <div className="content">
          <div className="links">
            <a href="/">TRANG CHỦ</a>
            <a href="/binh-chon">BÌNH CHỌN</a>
            <a href="/danh-gia">ĐÁNH GIÁ</a>
            <a href="/gioi-thieu">GIỚI THIỆU</a>
          </div>
          <div className="under-content">
            <div className="footer-section about-us">
              <h3>Về chúng tôi</h3>
              <p>
              Hệ thống bỏ phiếu trực tuyến sử dụng công nghệ blockchain, đảm bảo tính minh bạch, an toàn và bảo mật cho mọi cuộc bầu cử và bình chọn. Chúng tôi cam kết mang đến trải nghiệm bỏ phiếu công bằng và hiệu quả cho tất cả người dùng.
              </p>
            </div>
            <div className="footer-section terms">
              <h3>Chính sách & Điều khoản</h3>
              <p>Chính sách bảo mật: Chúng tôi cam kết bảo vệ quyền riêng tư và bảo mật thông tin cá nhân của người dùng theo tiêu chuẩn quốc tế.
Điều khoản sử dụng: Đọc kỹ điều khoản sử dụng trước khi tham gia vào hệ thống bỏ phiếu của chúng tôi.
</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
