import React from "react";
import Slider from "react-slick";
import "./ContentHomeSlideAnomation.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import image1 from '../../../../assets/anh-dep-thien-nhien-2-1.jpg'
export const ContentHomeSlideAnomation = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow className="" style={{}} onClick={() => {}} />,
        prevArrow: <SamplePrevArrow className="" style={{}} onClick={() => {}} />
      };
    
      return (
        <div className="home_image">
          <Slider {...settings}>
            <div>
              <img src={image1} alt="Image 1" />
            </div>
            <div>
              <img src="image2.jpg" alt="Image 2" />
            </div>
            <div>
              <img src="image3.jpg" alt="Image 3" />
            </div>
            <div>
              <img src="image4.jpg" alt="Image 4" />
            </div>
            <div>
              <img src="image5.jpg" alt="Image 5" />
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
  
  function SamplePrevArrow(props: SampleNextArrowProps ) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", left: "10px", zIndex: "1" }}
        onClick={onClick}
      />
    );
  }
  