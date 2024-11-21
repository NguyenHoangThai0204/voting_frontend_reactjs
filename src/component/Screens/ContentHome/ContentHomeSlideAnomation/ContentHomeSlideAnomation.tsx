import React from "react";
import Slider from "react-slick";
import "./ContentHomeSlideAnomation.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import image1 from '../../../../assets/vote1.jpg'
import image2 from '../../../../assets/vote3.png'
import image3 from '../../../../assets/vote5.png'

export const ContentHomeSlideAnomation = () => {
  const settings = {
    dots: true, // Hiển thị các điểm (dots) ở dưới slider để người dùng có thể chọn ảnh trực tiếp.
    infinite: true, // Slider sẽ lặp lại (vòng lặp vô tận) khi đến ảnh cuối cùng.
    speed: 500, // Thời gian chuyển đổi giữa các ảnh là 500ms (nửa giây).
    slidesToShow: 1, // Chỉ hiển thị một ảnh tại một thời điểm.
    slidesToScroll: 1, // Chuyển một ảnh mỗi lần (scroll).
    autoplay: true, // Bật chế độ tự động chuyển ảnh.
    autoplaySpeed: 2000, // Mỗi ảnh sẽ chuyển sau 2000ms (2 giây).
    nextArrow: <SampleNextArrow className="" style={{}} onClick={() => {}} />, // Tùy chỉnh nút Next (tiến) với component `SampleNextArrow`.
    prevArrow: <SamplePrevArrow className="" style={{}} onClick={() => {}} /> // Tùy chỉnh nút Prev (lùi) với component `SamplePrevArrow`.
  };
  

  return (
    <div className="home_image">
      <Slider {...settings}>
        <div>
          <img src={image2} alt="Image 1" />
        </div>
        <div>
          <img src={image3} alt="Image 2" />
        </div>
        <div>
          <img src={image1} alt="Image 3" />
        </div>
      </Slider>
    </div>
  );
}

interface SampleNextArrowProps {
  className: string;
  style: React.CSSProperties;
  onClick: () => void;
}

function SampleNextArrow(props: SampleNextArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "10px" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: SampleNextArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "10px", zIndex: "1" }}
      onClick={onClick}
    />
  );
}
