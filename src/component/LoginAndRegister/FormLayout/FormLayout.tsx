import React, { useState, useEffect } from 'react'; // Thêm `useEffect`
import LoginForm from '../LoginFrom/LoginForm';
import SignUpForm from '../SignupForm/SignUpForm';
import './FormLayout.css';

interface FormLayoutProps {
  formType: 'login' | 'signup';
  onLoginClick: () => void;
  onSignUpClick: () => void;
}

export const FormLayout: React.FC<FormLayoutProps> = ({ formType, onLoginClick, onSignUpClick }) => {
  const [currentImage, setCurrentImage] = useState('/assets/nen1.png'); // Ảnh ban đầu
  const [nextImage, setNextImage] = useState('/assets/nen2.png'); // Ảnh tiếp theo
  const [isSliding, setIsSliding] = useState(false);

  // Thêm logic tự động chuyển đổi ảnh
 useEffect(() => {
  const interval = setInterval(() => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentImage(nextImage);
      setNextImage((prevImage) =>
        prevImage === '/assets/nen1.png' ? '/assets/nen2.png' : '/assets/nen1.png'
      );
      setIsSliding(false);
    }, 1000); // Thời gian trượt ảnh
  }, 3000); // Đổi ảnh mỗi 3 giây

  return () => clearInterval(interval); // Xoá khi unmount để tránh rò rỉ bộ nhớ
}, [nextImage]);

  return (
    <div className="body">
      <div className="wrapperFormLayout">
        {/* Phần nội dung bên phải */}
        <div className={`content_login_right ${isSliding ? 'sliding' : ''}`}>
  <img src={currentImage} alt="Background" />
</div>

        {/* Phần nội dung bên trái */}
        <div
  className="content_login_left"
>
          {formType === 'signup' ? (
            <SignUpForm onLoginClick={onLoginClick} />
          ) : (
            <LoginForm onSignUpClick={onSignUpClick} />
          )}
        </div>
      </div>
    </div>
  );
};
